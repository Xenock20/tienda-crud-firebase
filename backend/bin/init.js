"use strict";
require("dotenv").config();
const { initialize } = require("../app"); // Importar la función `initialize` de `app.js`
const logger = require("../lib/logger");

const app = initialize(); // Inicializar la aplicación
const PORT = process.env.SERVER_PORT || 3000; // Usa el puerto definido en .env o 3000 por defecto

app.listen(PORT, () => {
    logger.info(`Your server is listening on port ${PORT}`);
}).on("error", (error) => {
    logger.error("APP STOPPED");
    logger.error(error.stack);
    process.exit(1);
});
