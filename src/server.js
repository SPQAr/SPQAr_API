/**
 * Módulo de inicialização do servidor.
 * 
 * Este módulo é responsável por importar a aplicação (app) e iniciar o servidor na porta especificada.
 * Quando o servidor estiver rodando, será exibida uma mensagem no console indicando a URL onde o servidor está acessível.
 * 
 * @module server
 * @requires app
 * 
 * @constant {number} PORT - A porta na qual o servidor irá escutar (3000 por padrão).
 */

const app = require('./app'); // Importa a aplicação configurada no arquivo 'app.js'

const PORT = 3000; // Define a porta em que o servidor irá rodar

/**
 * Inicializa o servidor na porta definida e exibe uma mensagem no console quando o servidor for iniciado com sucesso.
 * 
 * @function startServer
 * @throws {Error} Lança erro caso não seja possível iniciar o servidor.
 */
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
