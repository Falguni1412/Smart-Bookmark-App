const http = require('http');
const fs = require('fs');

const req = http.get('http://localhost:3000', (res) => {
    fs.writeFileSync('server_status.txt', `Server is running. Status Code: ${res.statusCode}`);
});

req.on('error', (e) => {
    fs.writeFileSync('server_status.txt', `Server check failed: ${e.message}`);
});
