# Projeto de Testes Automatizados para Luma Store

Este projeto contém os testes automatizados de ponta a ponta (E2E) para a aplicação Luma Store, desenvolvidos com Cypress.

## 📖 Sobre

O objetivo deste projeto é garantir a qualidade e o funcionamento correto das principais funcionalidades da plataforma, como:

- [x] Fluxo de Login
- [x] Cadastro de Usuário
- [x] Pesquisa de produtos
- [x] Carrinho de produtos
- [x] Finalização de pedido

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/)
- [Node.js](https://nodejs.org/en/)
- [Faker.js](https://fakerjs.dev/) para geração de dados dinâmicos.

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
- [Git](https://git-scm.com)
- [Node.js (versão LTS recomendada)](https://nodejs.org/)

## 🏁 Começando

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:marlonolivveira/automationMagento.git
   ```

2. **Acesse a pasta do projeto:**

   ```bash
   cd automationMagento
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

## 🏃‍♀️ Executando os Testes

O Cypress permite executar os testes de duas formas principais:

### Modo Headless (Completo). Ideal para execução em esteiras de CI/CD ou para rodar toda a suíte de testes de uma vez. Executa os testes em segundo plano, sem interface gráfica.

   ```bash
   npx cypress run
   ```

## 🧪 Executando no modo interativo (opcional)

   ```bash
   npx cypress open
   ```

## ✍️ Autor

[Marlon Oliveira](https://github.com/marlonolivveira)