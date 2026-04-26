# 💈 BarberPro - Sistema de Gestão de Barbearia

O **BarberPro** é uma aplicação Full-Stack moderna para a gestão de agendamentos e profissionais de barbearia. O projeto foi desenvolvido com uma arquitetura separada (Decoupled), utilizando tecnologias de ponta para garantir performance e segurança.

---

## 🚀 Tecnologias Utilizadas

### **Back-End (Servidor)**
* **Node.js**: Ambiente de execução Javascript.
* **Express**: Framework para a criação da API.
* **MariaDB**: Base de dados relacional para persistência de dados.

### **Front-End (Interface)**
* **React + Vite**: Framework moderno para interfaces rápidas.
* **Tailwind CSS**: Estilização responsiva e moderna.
* **PWA (Progressive Web App)**: Aplicação instalável no telemóvel/celular e funcional offline.
* **Lucide React**: Biblioteca de ícones profissionais.

---

## 📂 Estrutura do Projeto

O repositório está organizado da seguinte forma:

* `/Back-End`: Contém a API, lógica de negócio e conexão com a base de dados.
* `/Front-End`: Contém toda a interface do utilizador, gestão de estados e componentes React.

---

## 🛠️ Como Executar o Projeto

### **1. Preparação da Base de Dados**
Certifique-se de que o **MariaDB** está em execução no seu sistema.
1. Crie uma base de dados chamada `barber_db`.
2. Importe o ficheiro SQL (geralmente localizado na pasta do Back-End) para criar as tabelas de utilizadores, barbeiros e agendamentos.

### **2. Configuração do Back-End**
Abra um terminal na raiz do projeto:
```bash
cd Back-End
npm install
node server.js

O servidor estará ativo em: http://localhost:3000
3. Configuração do Front-End

Abra um segundo terminal na raiz do projeto:
Bash

cd Front-End
npm install
npm run dev

A aplicação estará disponível em: http://localhost:5173
🔐 Níveis de Acesso

O sistema possui três níveis de permissão:

    Cliente: Pode visualizar serviços e realizar agendamentos.

    Barbeiro: Pode visualizar a sua agenda pessoal e confirmar/cancelar serviços.

    Administrador (Dono): Acesso total ao painel para gerir a equipa de barbeiros e visualizar todos os agendamentos da casa.

👨‍💻 Desenvolvedor

    Josimar Bitencourt Pereira

    Lucas

    Chris

    Guilherme

Alunos do curso Técnico em Informática para a Internet - IFSC.