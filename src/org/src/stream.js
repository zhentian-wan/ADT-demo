// create-big-file.js

const fs = require('fs')
const file = fs.createWriteStream('./big.file')

for (let i = 0; i <= 1e6; i++) {
    file.write('awefawgrga afewfa')
}

file.end();

//server.js
const fs = require('fs')
const server = require('http').createServer();
server.on('request', (req, res) => {
    /*fs.readFile('./big.file', (err, data) => {
        if (err) throw err;

        res.end(data);
    })*/
    const src = fs.createReadStream('./big.file')
    src.pipe(res)
});

server.listen(8000);

// zip.js

const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2];
const crypto = require('crypto');
const {Transform} = require('stream');

const progress = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write('.')
        callback(null, chunk)
    }
});

//crypto + gzip
fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(crypto.createCipher('aes192', 'a_secret'))
    .pipe(progress)
    //.on('data', () => process.stdout.write('.')) // loading / processing
    .pipe(fs.createWriteStream(file + '.zz'))
    .on('finish', () => console.log('DONE'));

// uncrypto + unzip
fs.createReadStream(file)
    .pipe(crypto.createCipher('aes192', 'a_secret'))
    .pipe(zlib.createGunzip())
    .pipe(progress)
    .pipe(fs.createWriteStream(file.slice(0, -3)))
    .on('finish', () => console.log('DONE'))