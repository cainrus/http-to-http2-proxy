const net = require('net');
const http = require('http');
const http2 = require('http2');
const socketPath = `/tmp/socket.test.${Date.now()}`;

const createSocketConnection = socketPath => new Promise(resolve => {
    const socket = net.createConnection(socketPath, () => resolve(socket));
});

// front http 80 server.
http.createServer(async (req, res) => {
    const socket = await createSocketConnection(socketPath);
    req.pipe(socket).pipe(res);
}).listen(3333);

// private http2 socket server.
http2.createServer(function(socket) {
    console.log('http request');
    socket.write(`Echo server\r\n`);
    socket.pipe(socket);
}).listen(socketPath, async () => {
    const socket = await createConnection(socketPath);
});

