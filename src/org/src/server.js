const http = require('http');
const {fork} = require('child_process');

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/compute') {
        //const sum = longComputation();
        //return res.end(`Sum is ${sum}`);
        const compute = fork('compute.js');
        // start processing
        compute.send('start');
        // listen to the message
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);
        });
    } else {
        res.end('Ok');
    }
});
server.listen(3000)




// Compute.js
const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }
    return sum;
}

// test the Bench mark: ab -c200 -t10 http:localhost:8000/

const pid = process.pid;
// listen the mssage event on the global
// then do the computation
process.on('message', (msg) => {
    const sum = longComputation();
    process.send(sum);
})
let usersCount;
http.createServer((req, res) => {
    for (let i = 0; i<1e7; i++); // simulate CPU work
    res.write(`Users ${usersCount}`);
    res.end(`Handled by process ${pid}`)
}).listen(8000, () => {
    console.log(`Started process ${pid}`);
})

process.on('message', msg => {
    usersCount = msg.usersCount;
})

// Cluster.js
const cluster = require('cluster');
const os = require('os');
/**
 * Mock DB Call
 */
const numberOfUsersDB = function() {
    this.count = this.count || 6;
    this.count = this.count * this.count;
    return this.count;
}

// For runing for the first time,
// Master worker will get started
// Then we can fork our new workers
if (cluster.isMaster) {
    const cpus = os.cpus().length;

    console.log(`Forking for ${cpus} CPUs`);
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    // In case of crash, we want to strat a new worker
    cluster.on('exit', (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.id} crashed. Starting a new wroker`);
            cluster.fork();
        }
    })

    // kill -SIGUSR2 <MASTER_PID>
    // In case to upgrade, we want to restart each worker one by one
    process.on('SIGUSR2', () => {
        const workers = Object.values(cluster.workers);
        const restartWorker = (workerIndex) => {
            const worker = cluster.workers[workerIndex];
            if (!worker) return;

            // On worker exit, we want to restart it, then continue
            // with next worker
            worker.on('exit', () => {
                // If it is because crash, we don't continue
                if (!worker.exitedAfterDisconnect) return;
                console.log(`Exited process ${worker.process.pid}`);
                cluster.fork().on('listening', () => {
                    restartWorker(workerIndex + 1);
                });

                worker.disconnect();
            });
        }
        // Calling restartWorker recursively
        restartWorker(0);
    });


    const updateWorkers = () => {
        const usersCount = numberOfUsersDB();
        Object.values(cluster.workers).forEach(worker => {
            worker.send({usersCount});
        });
    }

    updateWorkers();
    setInterval(updateWorkers, 10000);
} else {
    require('./server');
}
