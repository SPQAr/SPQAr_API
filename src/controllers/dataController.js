/**
 * Módulo para gerenciar clientes e enviar dados de estações via Server-Sent Events (SSE).
 * 
 * Este módulo gerencia as conexões dos clientes, envia dados das estações em tempo real e recebe dados 
 * de uma estação para atualização do status e envio para os clientes conectados.
 * 
 * @module stationDataModule
 */

let clients = []; // Lista de clientes conectados
const stationData = { 
  A: { title: 'Estação A', data: [] }, 
  B: { title: 'Estação B', data: [] },
  C: { title: 'Estação C', data: [] }
}; // Dados das estações

/**
 * Função que envia o status inicial das estações para um cliente.
 * 
 * Esta função envia os status das estações para um cliente que se conecta ao servidor.
 * O status é determinado pela presença de dados na estação (ativo se houver dados, inativo caso contrário).
 * 
 * @function sendInitialStationsStatus
 * @param {object} client - O cliente (resposta HTTP) para o qual os dados serão enviados.
 */
const sendInitialStationsStatus = (client) => {
  const stations = Object.keys(stationData).map(stationId => ({
    id: stationId,
    title: stationData[stationId].title,
    status: stationData[stationId].data.length > 0 ? 'ativo' : 'inativo',
  }));
  
  const initialMessage = JSON.stringify({ stations });
  client.write(`data: ${initialMessage}\n\n`);
};

/**
 * Função que adiciona um novo cliente à lista de clientes conectados e envia o status das estações.
 * 
 * Esta função é chamada quando um cliente se conecta ao servidor via SSE. Ela configura os cabeçalhos de 
 * resposta, envia o status inicial das estações e mantém a conexão aberta para enviar dados em tempo real.
 * 
 * @function addClient
 * @param {object} req - A requisição HTTP.
 * @param {object} res - A resposta HTTP.
 * @returns {void}
 */
exports.addClient = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Adiciona o cliente à lista
  clients.push(res);

  // Envia o status das estações assim que o cliente se conectar
  sendInitialStationsStatus(res);

  // Envia uma confirmação de que a conexão foi estabelecida
  res.write(`data: "Conexão estabelecida"\n\n`);

  // Remove o cliente da lista ao fechar a conexão
  req.on("close", () => {
    clients = clients.filter(client => client !== res);
  });
};

/**
 * Função que envia os dados de uma estação para os clientes conectados.
 * 
 * Esta função envia os dados de uma estação para todos os clientes conectados via SSE. 
 * Os dados são enviados a cada intervalo de 5 segundos. Caso não haja clientes conectados, 
 * os dados não são enviados.
 * 
 * @function sendDataToClients
 * @param {string} stationId - O ID da estação cujos dados serão enviados.
 */
const sendDataToClients = (stationId) => {
  if (clients.length > 0 && stationData[stationId].data.length > 0) {
    const data = stationData[stationId].data.shift(); // Remove o primeiro dado da fila
    const message = JSON.stringify({ ppm: data.ppm, id: stationId });

    clients.forEach(client => {
      try {
        client.write(`data: ${message}\n\n`);
        console.log(`Enviando para cliente: ${message}`);
      } catch (err) {
        console.error(`Erro ao enviar mensagem: ${err.message}`);
        // Remove cliente em caso de erro
        clients = clients.filter(c => c !== client);
      }
    });
  } else if (clients.length === 0) {
    console.log("Nenhum cliente conectado. Dados não enviados.");
  }
};

/**
 * Função que inicia o envio de dados das estações para os clientes a cada 5 segundos.
 * 
 * Esta função é executada periodicamente, iterando sobre todas as estações e enviando seus dados 
 * para os clientes conectados via SSE.
 * 
 * @function startSendingData
 * @returns {void}
 */
const startSendingData = () => {
  setInterval(() => {
    // Itera sobre todas as estações
    Object.keys(stationData).forEach(stationId => sendDataToClients(stationId));
  }, 5000); // Intervalo de 5 segundos
};

// Inicia o envio de dados
startSendingData();

/**
 * Função que recebe os dados de uma estação e os adiciona à fila correspondente.
 * 
 * Esta função é chamada quando o servidor recebe dados de uma estação via requisição POST.
 * Ela valida se a estação existe, atualiza o status e adiciona os dados à fila de dados da estação.
 * Se não houver clientes conectados, os dados não são adicionados à fila.
 * 
 * @function receiveData
 * @param {object} req - A requisição HTTP contendo os dados da estação.
 * @param {object} res - A resposta HTTP.
 * @returns {object} - Retorna uma mensagem de sucesso ou erro dependendo da situação.
 */
exports.receiveData = (req, res) => {
  const { ppm, id } = req.body;

  id.toUpperCase();

  if (!stationData[id]) {
    return res.status(400).json({ error: `Estação ${id} inválida!` });
  }

  // Verifica se há clientes conectados antes de adicionar os dados à fila
  if (clients.length > 0) {
    // Adiciona os dados à fila correspondente
    stationData[id].data.push({ ppm });

    // Atualiza o status da estação para 'online'
    stationData[id].status = 'online';

    console.log(`Dado recebido: ${ppm} PPM da estação ${id}`);

    res.status(200).json({ message: "Dados recebidos com sucesso!" });
  } else {
    console.log("Nenhum cliente conectado. Dados não adicionados à fila.");
    res.status(400).json({ error: "Nenhum cliente conectado para receber os dados." });
  }
};
