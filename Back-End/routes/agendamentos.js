const express = require('express');
const router = express.Router();
const db = require('../config/db');

// --- FUNÇÕES DE VALIDAÇÃO (REGRAS DE NEGÓCIO) ---

// Verifica se a data e hora estão dentro do horário de funcionamento
function validarHorarioFuncionamento(dataIso) {
    const data = new Date(dataIso);
    const diaSemana = data.getDay(); // 0 = Domingo, 1 = Segunda...
    const hora = data.getHours();

    if (diaSemana === 0) {
        return "A barbearia está fechada aos domingos.";
    }
    if (hora < 9 || hora >= 18) {
        return "Horário indisponível. O expediente é das 09h às 18h.";
    }
    return null; // Retorna null se estiver tudo certo
}

// Verifica se o barbeiro já tem um agendamento neste horário
async function verificarConflito(barbeiro_id, data_hora, agendamento_id_ignorado = null) {
    let query = "SELECT id FROM agendamentos WHERE barbeiro_id = ? AND data_hora = ? AND status = 'AGENDADO'";
    let params = [barbeiro_id, data_hora];

    // Se estivermos remarcando, ignoramos o ID do agendamento atual na busca
    if (agendamento_id_ignorado) {
        query += " AND id != ?";
        params.push(agendamento_id_ignorado);
    }

    const [rows] = await db.query(query, params);
    return rows.length > 0; // Retorna true se houver conflito
}

// --- ROTAS DA API ---

// 1. Listar todos os agendamentos (GET)
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT a.id, u.nome AS cliente, b.nome AS barbeiro, a.data_hora, a.status
            FROM agendamentos a
            JOIN usuarios u ON a.usuario_id = u.id
            JOIN barbeiros b ON a.barbeiro_id = b.id
            ORDER BY a.data_hora DESC
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar agendamentos", detalhes: err.message });
    }
});

// 2. Criar um novo agendamento (POST)
router.post('/', async (req, res) => {
    const { usuario_id, barbeiro_id, data_hora } = req.body;

    // Validação 1: Horário de funcionamento
    const erroHorario = validarHorarioFuncionamento(data_hora);
    if (erroHorario) {
        return res.status(400).json({ error: erroHorario });
    }

    try {
        // Validação 2: Conflito de horários
        const temConflito = await verificarConflito(barbeiro_id, data_hora);
        if (temConflito) {
            return res.status(400).json({ error: "Este horário já está reservado com este barbeiro." });
        }

        // Se passou nas validações, insere no banco
        const query = "INSERT INTO agendamentos (usuario_id, barbeiro_id, data_hora) VALUES (?, ?, ?)";
        await db.query(query, [usuario_id, barbeiro_id, data_hora]);
        
        res.status(201).json({ message: "Agendamento realizado com sucesso." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar agendamento", detalhes: err.message });
    }
});

// 3. Cancelar um agendamento (PATCH)
router.patch('/:id/cancelar', async (req, res) => {
    const agendamentoId = req.params.id;

    try {
        const query = "UPDATE agendamentos SET status = 'CANCELADO' WHERE id = ?";
        const [result] = await db.query(query, [agendamentoId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Agendamento não encontrado." });
        }

        res.json({ message: "Agendamento cancelado com sucesso." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao cancelar agendamento", detalhes: err.message });
    }
});

// 4. Remarcar um agendamento (PATCH)
router.patch('/:id/remarcar', async (req, res) => {
    const agendamentoId = req.params.id;
    const { nova_data_hora, barbeiro_id } = req.body;

    // Validação 1: Horário de funcionamento
    const erroHorario = validarHorarioFuncionamento(nova_data_hora);
    if (erroHorario) {
        return res.status(400).json({ error: erroHorario });
    }

    try {
        // Validação 2: Conflito de horários (ignorando o próprio agendamento)
        const temConflito = await verificarConflito(barbeiro_id, nova_data_hora, agendamentoId);
        if (temConflito) {
            return res.status(400).json({ error: "Este novo horário já está reservado." });
        }

        // Atualiza a data e garante que o status volte para AGENDADO (caso estivesse cancelado)
        const query = "UPDATE agendamentos SET data_hora = ?, status = 'AGENDADO' WHERE id = ?";
        const [result] = await db.query(query, [nova_data_hora, agendamentoId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Agendamento não encontrado." });
        }

        res.json({ message: "Agendamento remarcado com sucesso." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao remarcar agendamento", detalhes: err.message });
    }
});

module.exports = router;