# SPQAr_API

## 📋 Sobre o Projeto

A **SPQAr_API** é uma aplicação backend desenvolvida para integrar e gerenciar os dados sobre a qualidade do ar no sistema SPQAr. Este componente fornece funcionalidades para:

- **Receber e processar dados** de sensores ambientais.
- **Atualizar os dados** em tempo real.
- **Disponibilizar endpoints** para que a interface visualize e apresente informações sobre a qualidade do ar de forma prática e eficiente.

## ⚙️ Tecnologias Utilizadas

As principais tecnologias empregadas na SPQAr_API são:

- **Node.js**: Plataforma para execução de JavaScript no servidor.
- **Express.js**: Framework para construção de APIs RESTful.

## 🚀 Funcionalidades Principais

1. **Recepção de Dados**: 
   - A API é capaz de consumir dados de fontes externas, como sensores ambientais.
   
2. **Gestão de Dados**:
   - Armazenamento, atualização e recuperação de informações sobre a qualidade do ar.

3. **Disponibilização de Endpoints**:
   - Oferece endpoints RESTful para a interface conectar-se à API e exibir os dados ao usuário final.

4. **Autenticação**:
   - Implementação de autenticação com tokens para proteger o acesso aos dados.

## 📁 Estrutura do Repositório

```
SPQAr_API/
│
├── src/
│   ├── controllers/       # Lógica dos endpoints
│   ├── models/            # Estrutura de dados e integração com o banco
│   ├── routes/            # Definição das rotas da API
│
├── package.json           # Dependências e scripts do Node.js
└── README.md              # Documentação do repositório
```

## 🔧 Configuração e Execução

### Pré-requisitos

- **Node.js** versão 18 ou superior.

### Passos para Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/SPQAr_API.git
   cd SPQAr_API
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     ```
     PORT=8080
     ```

4. Execute a aplicação:

   ```bash
   npm start
   ```

5. Para executar em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**SPQAr_API** - Contribuindo para um ambiente mais limpo e saudável 🌱
