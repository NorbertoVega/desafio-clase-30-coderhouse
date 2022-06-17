const initializeServer = require('./src/app.js');
const config = require('./config.js');
const cluster = require('cluster');
const os = require('os');

const port = config.PORT;
const modo = config.MODO;
const numCpus = os.cpus().length;

if (modo === 'FORK')
    initializeServer(port, modo);

else if (modo === 'CLUSTER') {
    console.log('Modo:', modo);
    if (cluster.isMaster) {
        console.log(`Master process ${process.pid}`);
        for (let i = 0; i < numCpus; i++) {
            cluster.fork();
        }
        cluster.on("listening", (worker, address) => {
            console.log(`${worker.process.pid} is listening at port ${address.port}`);
        })
    }
    else {
        initializeServer(port, modo);
        console.log(`worker ${process.pid} started`);
    }
}
