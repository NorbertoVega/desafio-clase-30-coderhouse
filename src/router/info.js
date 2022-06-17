const { Router } = require('express');
const parseArgs = require('minimist');
const os = require('os');
const config = require('../../config.js');

const router = Router();
const args = parseArgs(process.argv.slice(2));
const numCpus = config.MODO === 'FORK' ? 1 : os.cpus().length;

router.get('/info', (req, res) => {
    try {
        const info = {
            argEntrada: args,
            pathEjec: process.argv[0],
            os: process.platform,
            processId: process.pid,
            nodeVersion: process.version,
            carpetaProy: process.argv[1],
            memoryUse: process.memoryUsage().rss,
            numCpus : numCpus
        }
        res.send(info);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;