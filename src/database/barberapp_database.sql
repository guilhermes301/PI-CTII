
-- Banco de dados feito para o projeto do sistema do BarberApp/ Sistema de Barbearia

CREATE DATABASE IF NOT EXISTS barbearia
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE barbearia;

-- REMOVER ESTRUTURAS ANTIGAS

DROP VIEW IF EXISTS vw_agendamentos_detalhados;

DROP TABLE IF EXISTS bloqueio_agenda_barbeiro;
DROP TABLE IF EXISTS horarios_trabalho_barbeiro;
DROP TABLE IF EXISTS agendamentos;
DROP TABLE IF EXISTS administradores;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS barbeiros;
DROP TABLE IF EXISTS servicos;

-- TABELA DE CLIENTES
CREATE TABLE clientes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at DATETIME NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uq_clientes_email (email)
) ENGINE=InnoDB;

-- TABELA DE BARBEIROS
CREATE TABLE barbeiros (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(30) NULL,
    password_hash VARCHAR(255) NOT NULL,

    ativo TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at DATETIME NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uq_barbeiros_email (email)
) ENGINE=InnoDB;

-- TABELA DE ADMINISTRADORES
CREATE TABLE administradores (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    ativo TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at DATETIME NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uq_administradores_email (email)
) ENGINE=InnoDB;

-- TABELA DE SERVIÇOS
CREATE TABLE servicos (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,

    preco DECIMAL(10,2) NOT NULL,
    duracao SMALLINT UNSIGNED NOT NULL COMMENT 'Duração em minutos',

    descricao VARCHAR(255) NOT NULL,

    ativo TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at DATETIME NULL,

    PRIMARY KEY (id),

    CONSTRAINT chk_preco_servico CHECK (preco >= 0),
    CONSTRAINT chk_duracao_servico CHECK (duracao > 0)

) ENGINE=InnoDB;

-- HORARIOS DE TRABALHO
CREATE TABLE horarios_trabalho_barbeiro (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    barbeiro_id BIGINT UNSIGNED NOT NULL,

    dia_semana TINYINT NOT NULL COMMENT '0=domingo ... 6=sábado',

    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,

    inicio_intervalo TIME NULL,
    fim_intervalo TIME NULL,

    ativo TINYINT(1) NOT NULL DEFAULT 1,

    PRIMARY KEY (id),

    CONSTRAINT fk_horario_barbeiro
        FOREIGN KEY (barbeiro_id)
        REFERENCES barbeiros(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_dia_semana CHECK (dia_semana BETWEEN 0 AND 6)

) ENGINE=InnoDB;

-- BLOQUEIO DE AGENDA
CREATE TABLE bloqueio_agenda_barbeiro (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    barbeiro_id BIGINT UNSIGNED NOT NULL,

    inicio_bloqueio DATETIME NOT NULL,
    fim_bloqueio DATETIME NOT NULL,

    motivo VARCHAR(255) NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_bloqueio_barbeiro
        FOREIGN KEY (barbeiro_id)
        REFERENCES barbeiros(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

    CONSTRAINT chk_bloqueio_datas CHECK (inicio_bloqueio < fim_bloqueio)
) ENGINE=InnoDB;

-- TABELA DE AGENDAMENTOS
CREATE TABLE agendamentos (
    id CHAR(36) NOT NULL,

    cliente_id BIGINT UNSIGNED NOT NULL,
    barbeiro_id BIGINT UNSIGNED NOT NULL,
    servico_id BIGINT UNSIGNED NOT NULL,

    cliente_nome VARCHAR(120) NOT NULL,
    cliente_email VARCHAR(150) NOT NULL,
    cliente_telefone VARCHAR(30) NOT NULL,

    servico_nome VARCHAR(120) NOT NULL,
    barbeiro_nome VARCHAR(120) NOT NULL,

    data_agendamento DATE NOT NULL,
    hora_agendamento TIME NOT NULL,

    hora_fim TIME NULL,

    status ENUM(
        'PENDENTE',
        'CONFIRMADO',
        'CANCELADO',
        'CONCLUIDO',
        'AUSENTE',
        'REAGENDADO'
    ) NOT NULL DEFAULT 'PENDENTE',

    visivel_para_cliente TINYINT(1) NOT NULL DEFAULT 1,

    cancelled_by ENUM(
        'CLIENTE',
        'BARBEIRO',
        'ADMINISTRADOR',
        'SISTEMA'
    ) NULL,

    cancelled_at DATETIME NULL,

    observacoes VARCHAR(255) NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at DATETIME NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_agendamento_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_agendamento_barbeiro
        FOREIGN KEY (barbeiro_id)
        REFERENCES barbeiros(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_agendamento_servico
        FOREIGN KEY (servico_id)
        REFERENCES servicos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

--EVITA AGENDA DUPLICADA PARA O MESMO BARBEIRO NO MESMO HORARIO
    UNIQUE KEY uq_horario_barbeiro (
        barbeiro_id,
        data_agendamento,
        hora_agendamento
    ),

    KEY idx_status_data (
        status,
        data_agendamento
    )

    CONSTRAINT chk_hora_fim CHECK (hora_fim IS NULL OR hora_fim > hora_agendamento)
    
) ENGINE=InnoDB;

-- DADOS INICIAIS
INSERT INTO servicos (nome, preco, duracao, descricao)
VALUES
    ('Corte Clássico', 50.00, 30, 'Corte tradicional'),
    ('Barba Modelada', 35.00, 20, 'Toalha quente e navalha'),
    ('Corte + Barba', 75.00, 50, 'Combo completo');

-- VIEW DE CONSULTA
CREATE OR REPLACE VIEW vw_agendamentos_detalhados AS
SELECT
    a.id,
    a.status,
    a.data_agendamento,
    a.hora_agendamento,
    a.hora_fim,
    a.cliente_nome,
    a.cliente_email,
    a.cliente_telefone,
    a.observacoes,
    a.created_at,
    a.updated_at,

    c.nome AS nome_cliente_real,
    b.nome AS nome_barbeiro_real,
    s.nome AS nome_servico_real,
    s.preco,
    s.duracao

FROM agendamentos a
LEFT JOIN clientes c
    ON c.id = a.cliente_id
LEFT JOIN barbeiros b
    ON b.id = a.barbeiro_id
LEFT JOIN servicos s
    ON s.id = a.servico_id;