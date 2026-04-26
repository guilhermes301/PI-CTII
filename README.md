# 💈 BarberPro - Sistema de Agendamento Full-Stack (PWA)

[![IFSC](https://img.shields.io/badge/Instituição-IFSC-green)](https://www.ifsc.edu.br/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)](https://nodejs.org/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB)](https://reactjs.org/)
[![MariaDB](https://img.shields.io/badge/Database-MariaDB-003545)](https://mariadb.org/)

O **BarberPro** é uma solução completa para gestão de agendamentos em barbearias, desenvolvida como Projeto Integrador para o curso Técnico em Informática para a Internet. O sistema utiliza uma arquitetura moderna, separando as responsabilidades entre um servidor robusto e uma interface progressiva (PWA).

---

## Tecnologias e Ferramentas

- **Frontend:** React + TypeScript, Tailwind CSS, Lucide Icons, Vite.
- **Backend:** Node.js, Express, MySQL2.
- **Banco de Dados:** MariaDB / MySQL.
- **PWA:** Suporte a instalação mobile e funcionamento offline.

---

## Guia de Instalação e Execução

### 1. Pré-requisitos
Independente do sistema, você precisará de:
- **Node.js** (Versão 18 ou superior)
- **Git**
- **MariaDB** ou **MySQL** rodando localmente.

---

### 🐧 Instalação no Linux (Debian/Ubuntu/Pop!_OS)
1. Abra o terminal e clone o projeto:
   ```bash
   git clone [https://github.com/guilhermes301/PI-CTII.git](https://github.com/guilhermes301/PI-CTII.git)
   cd PI-CTII

    Configure o Banco de Dados:

        Importe o arquivo em barber-backend/database/barberapp_database.sql usando o comando:
    Bash

mariadb -u seu_usuario -p < barber-backend/database/barberapp_database.sql

Instale e rode o Backend:
Bash

cd barber-backend && npm install && node server.js

Em outro terminal, instale e rode o Frontend:
Bash

    cd Front-End && npm install && npm run dev

🪟 Instalação no Windows

    Baixe o projeto como ZIP ou use o Git Bash:
    Bash

git clone [https://github.com/guilhermes301/PI-CTII.git](https://github.com/guilhermes301/PI-CTII.git)

Configure o Banco de Dados:

    Use o HeidiSQL ou MySQL Workbench para abrir e executar o script SQL localizado em barber-backend/database.

Execute o Backend:

    Abra o CMD ou PowerShell na pasta barber-backend:

PowerShell

npm install
node server.js

Execute o Frontend:

    Abra outro CMD na pasta Front-End:

PowerShell

    npm install
    npm run dev

🍎 Instalação no macOS

    Use o Terminal:
    Bash

    git clone [https://github.com/guilhermes301/PI-CTII.git](https://github.com/guilhermes301/PI-CTII.git)
    cd PI-CTII

    Configure o Banco:

        Utilize o Sequel Ace ou linha de comando para importar o arquivo .sql.

    Inicie os serviços:

        Siga os mesmos comandos do Linux utilizando o npm install e npm run dev nas respectivas pastas.

👥 Autores

    Josimar Bitencourt Pereira

    Lucas

    Chris

    Guilherme

Alunos do curso Técnico em Informática para a Internet - IFSC.