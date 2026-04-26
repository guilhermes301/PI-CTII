# 💈 BarberPro - Sistema de Agendamento PWA

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> Projeto desenvolvido para a disciplina de **Projeto Integrador II** do curso Técnico em Informática para a Internet no **IFSC**.

## 📱 Sobre o Projeto

O **BarberPro** é um sistema web progressivo (PWA) criado para modernizar o agendamento de serviços em barbearias. Ele resolve conflitos de horários e automatiza a gestão, oferecendo uma experiência fluida com foco em dispositivos móveis (**Mobile First**) e funcionamento offline (**PWA**).

## ✨ Funcionalidades Principais

### 👤 Área do Cliente
- **📱 PWA Instalável:** Use como um aplicativo nativo no celular.
- **🔐 Cadastro/Login:** Acesso seguro para gerenciar seus agendamentos.
- **📅 Agendamento:** Escolha de serviço, barbeiro, data e hora com validação em tempo real.
- **🚫 Regras de Negócio:** Bloqueio de domingos, datas passadas e horários fora do expediente.
- **🌓 Tema:** Suporte a Modo Claro e Escuro (Dark Mode).

### ✂️ Área do Barbeiro & Admin
- **📅 Painel de Controle:** Gestão de status (Pendente, Confirmado, Cancelado).
- **👥 Gestão de Equipe:** O administrador pode adicionar ou remover profissionais.
- **📊 Visão Geral:** Controle total sobre todos os serviços agendados na barbearia.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React.js + TypeScript
- **Estilização:** Tailwind CSS & Lucide React (Ícones)
- **Lógica de Datas:** Date-fns
- **Banco de Dados:** LocalStorage (Simulação de persistência para o MVP)
- **PWA:** Vite Plugin PWA

## 🚀 Como Instalar e Rodar o Projeto

Siga os passos abaixo para configurar o ambiente em sua máquina local:

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

### 2. Clonar e Instalar
```bash
# Clone o repositório
git clone [https://github.com/Josimar-Pereira/Barber-app.git](https://github.com/Josimar-Pereira/Barber-app.git)

# Acesse a pasta
cd Barber-app

# Instale as dependências necessárias
npm install

# Inicie o servidor local
npm run dev

Perfil	     Identificação / E-mail	Senha
Administrador (Dono)	Ícone de Cadeado (Home/Login)	admin123
Barbeiro 1	  josimar@barbearia.com	   123456
Barbeiro 2	  carlos@barbearia.com	   123456


👨‍💻 Autores
Desenvolvido por Josimar, Lucas, Chris e Guilherme.
Alunos do curso Técnico em Informática para a Internet - IFSC.