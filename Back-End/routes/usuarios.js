const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const query = "SELECT id, nome, email, is_admin, criado_em FROM usuarios";
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar usuários", detalhes: err.message });
    }
});

// Criar um novo usuário (Cliente)
router.post('/', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
    }

    try {
        // Em um sistema real de produção, a senha deve ser criptografada com bcrypt antes de ser salva.
        const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
        await db.query(query, [nome, email, senha]);
        
        res.status(201).json({ message: "Usuário cadastrado com sucesso." });
    } catch (err) {
        // Verifica se o erro é de email duplicado (regra UNIQUE do banco)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Este email já está em uso." });
        }
        res.status(500).json({ error: "Erro ao criar usuário", detalhes: err.message });
    }
});

module.exports = router;