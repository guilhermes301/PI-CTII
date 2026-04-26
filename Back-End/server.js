const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o Banco de Dados (MariaDB)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ==========================================
// --- Rotas de Usuários e Autenticação ---
// ==========================================

// Cadastro de Usuário (com Telefone)
app.post('/usuarios', async (req, res) => {
  const { nome, email, telefone, senha } = req.body;

  if (!nome || !email || !telefone || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)',
      [nome, email, telefone, senha]
    );
    res.status(201).json({ message: 'Usuário cadastrado com sucesso.', id: result.insertId });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Este e-mail já está em uso.' });
    }
    res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
  }
});

// Login de Usuário (Retorna is_admin e telefone)
app.post('/usuarios/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const [usuarios] = await db.execute(
      'SELECT id, nome, email, telefone, is_admin FROM usuarios WHERE email = ? AND senha = ?',
      [email, senha]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    }

    res.json({
      message: 'Login realizado com sucesso!',
      user: usuarios[0]
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// ==========================================
// --- Rotas de Barbeiros (Equipe) ---
// ==========================================

// Lista apenas barbeiros ativos (para o formulário de agendamento)
app.get('/barbeiros', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, nome FROM barbeiros WHERE ativo = 1');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar barbeiros' });
  }
});

// Cadastro de novo barbeiro (Área Admin)
app.post('/barbeiros', async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O nome do barbeiro é obrigatório.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO barbeiros (nome, ativo) VALUES (?, 1)',
      [nome]
    );
    res.status(201).json({ message: 'Barbeiro cadastrado com sucesso.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar barbeiro' });
  }
});

// Inativação de barbeiro (Soft Delete)
app.patch('/barbeiros/:id/inativar', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      'UPDATE barbeiros SET ativo = 0 WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Barbeiro não encontrado.' });
    }
    
    res.json({ message: 'Barbeiro removido da equipe com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inativar barbeiro' });
  }
});

// ==========================================
// --- Rotas de Agendamentos ---
// ==========================================

// Lista todos os agendamentos (incluindo data de criação)
app.get('/agendamentos', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT a.id, u.nome as cliente, b.nome as barbeiro, a.data_hora, a.status, a.criado_em 
      FROM agendamentos a
      JOIN usuarios u ON a.usuario_id = u.id
      JOIN barbeiros b ON a.barbeiro_id = b.id
      ORDER BY a.data_hora DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
});

// Criação de agendamento com verificação de conflito
app.post('/agendamentos', async (req, res) => {
  const { usuario_id, barbeiro_id, data_hora } = req.body;

  try {
    // Verifica se já existe um agendamento para o mesmo barbeiro e horário
    const [conflito] = await db.execute(
      'SELECT id FROM agendamentos WHERE barbeiro_id = ? AND data_hora = ? AND status != "CANCELADO"',
      [barbeiro_id, data_hora]
    );

    if (conflito.length > 0) {
      return res.status(400).json({ error: 'Este horário já está reservado com este barbeiro.' });
    }

    await db.execute(
      'INSERT INTO agendamentos (usuario_id, barbeiro_id, data_hora) VALUES (?, ?, ?)',
      [usuario_id, barbeiro_id, data_hora]
    );
    res.status(201).json({ message: 'Agendamento realizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar agendamento', detalhes: error.message });
  }
});

// Cancelamento de agendamento
app.patch('/agendamentos/:id/cancelar', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      'UPDATE agendamentos SET status = "CANCELADO" WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }
    
    res.json({ message: 'Agendamento cancelado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cancelar agendamento' });
  }
});


// ==========================================
// --- Inicialização do Servidor ---
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor BarberPro rodando na porta ${PORT}`);
});