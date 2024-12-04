/**
 * Módulo de configuração da aplicação Express.
 * 
 * Este módulo configura a aplicação Express com middlewares para trabalhar com JSON, CORS e body-parser, 
 * além de definir as rotas principais da aplicação.
 * 
 * @module app
 * @requires express
 * @requires body-parser
 * @requires cors
 * @requires dataRoutes
 */

const express = require("express"); // Importa o Express, framework para construção de APIs
const bodyParser = require("body-parser"); // Middleware para parse de corpos de requisições
const cors = require("cors"); // Middleware para permitir requisições de diferentes origens
const dataRoutes = require("./routes/dataRoutes"); // Importa as rotas para manipulação de dados

const app = express(); // Cria a instância do aplicativo Express

// Middleware para trabalhar com JSON
app.use(express.json()); // Permite o Express entender e processar dados JSON
app.use(cors()); // Permite requisições de origens externas

// Configurando o body-parser
app.use(bodyParser.json()); // Middleware para tratar dados JSON no corpo das requisições

// Definindo as rotas
app.use('/', dataRoutes); // Define as rotas associadas à URL raiz

/**
 * Configura a aplicação Express, inicializa os middlewares e define as rotas para a aplicação.
 * 
 * @function createApp
 * @returns {object} O aplicativo Express configurado.
 */
module.exports = app; // Exporta a aplicação configurada para uso em outros módulos
