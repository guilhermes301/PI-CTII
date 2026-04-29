-- =======================================================
-- Esquema do Banco de Dados - BarberPro
-- Banco de Dados: MariaDB / MySQL
-- =======================================================

CREATE DATABASE IF NOT EXISTS barber_db;
USE barber_db;

-- 1. Tabela de Usuários (Clientes e Administradores)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) DEFAULT 0, -- 0 para cliente, 1 para admin
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Barbeiros (Equipe)
CREATE TABLE IF NOT EXISTS barbeiros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    ativo TINYINT(1) DEFAULT 1, -- 1 para ativo, 0 para inativo/removido
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Serviços
CREATE TABLE IF NOT EXISTS servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    duracao_minutos INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    barbeiro_id INT NOT NULL,
    servico_id INT NOT NULL,
    data_agendamento DATE NOT NULL,
    hora_agendamento TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'Confirmado', -- Ex: Confirmado, Cancelado, Concluído
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (barbeiro_id) REFERENCES barbeiros(id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id)
);

-- =======================================================
-- Inserção de Dados Iniciais (Opcional - Apenas para testes)
-- =======================================================

-- Criando o usuário Administrador (A senha real deve ser criptografada na API)
INSERT INTO usuarios (nome, email, telefone, senha, is_admin)
VALUES ('Josimar Pereira', 'josimar@email.com', '51999999999', 'senha123', 1)
ON DUPLICATE KEY UPDATE id=id;

-- Inserindo os serviços padrão da barbearia
INSERT INTO servicos (nome, descricao, preco, duracao_minutos) VALUES
('Corte Clássico', 'Corte tradicional.', 50.00, 30),
('Barba Modelada', 'Toalha quente e navalha.', 35.00, 20),
('Corte + Barba', 'Combo completo.', 75.00, 50);