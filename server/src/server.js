const http = require('http');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

async function startServer() {
    try {
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();