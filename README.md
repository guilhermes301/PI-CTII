# 💈 BarberPro - Sistema de Agendamento PWA

Projeto desenvolvido para a disciplina de **Projeto Integrador II** do curso Técnico em Informática para a Internet no **IFSC**.

## 📱 Sobre o Projeto
O **BarberPro** é um sistema web progressivo (PWA) criado para modernizar o agendamento de serviços em barbearias. Ele resolve conflitos de horários e automatiza a gestão, oferecendo uma experiência fluida com foco em dispositivos móveis (Mobile First).

## ✨ Funcionalidades Principais

### 👤 Área do Cliente
- **📱 PWA Instalável:** Use como um aplicativo nativo no celular.
- **🔐 Cadastro/Login:** Acesso seguro com persistência de dados.
- **📅 Agendamento:** Escolha de serviço, barbeiro, data e hora com validação em tempo real.
- **🚫 Regras de Negócio:** Bloqueio de domingos, datas passadas e horários fora do expediente.
- **🌓 Tema:** Suporte a Modo Claro e Escuro (Dark Mode).

### ✂️ Área do Barbeiro & Admin
- **📅 Painel de Controle:** Gestão de status (Pendente, Confirmado, Cancelado).
- **👥 Gestão de Equipe:** O administrador pode gerenciar profissionais.
- **📊 Visão Geral:** Controle total sobre todos os serviços agendados no banco de dados.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React.js + TypeScript (Vite)
- **Backend:** Node.js + Express
- **Banco de Dados:** MariaDB (Integração completa via MySQL2)
- **Estilização:** Tailwind CSS & Lucide React (Ícones)
- **PWA:** Vite Plugin PWA

## Como Instalar e Rodar o Projeto

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** e o **MariaDB** instalados em sua máquina.

### 2. Configurar o Back-end
```bash
cd barber-backend
npm install
# Configure suas credenciais no arquivo .env
node server.js

cd Front-End
npm install
npm run dev

Autores

    Josimar Pereira

    Lucas

    Chris

    Guilherme

Alunos do curso Técnico em Informática para a Internet - IFSC.