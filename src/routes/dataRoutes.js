/**
 * Módulo de rotas para manipulação de dados.
 * 
 * Este módulo define as rotas relacionadas ao recebimento de dados e envio de dados via Server-Sent Events (SSE).
 * 
 * @module dataRoutes
 * @requires express
 * @requires dataController
 */

const express = require("express"); // Importa o Express, framework para construção de APIs
const router = express.Router(); // Cria o roteador para definir as rotas da aplicação
const dataController = require("../controllers/dataController"); // Importa o controlador para manipulação de dados

/**
 * Rota POST para receber dados.
 * 
 * Esta rota é responsável por receber dados enviados ao servidor via requisição POST e 
 * encaminhar para o controlador adequado.
 * 
 * @name POST /
 * @function receiveData
 * @memberof module:dataRoutes
 * @see dataController.receiveData
 */
router.post('/', dataController.receiveData); // Chama a função no controlador para lidar com os dados recebidos

/**
 * Rota GET para enviar dados via SSE (Server-Sent Events).
 * 
 * Esta rota é responsável por enviar dados ao cliente em tempo real utilizando Server-Sent Events (SSE).
 * 
 * @name GET /data
 * @function addClient
 * @memberof module:dataRoutes
 * @see dataController.addClient
 */
router.get("/data", dataController.addClient); // Chama a função no controlador para adicionar um cliente via SSE

module.exports = router; // Exporta as rotas para uso no módulo principal
