const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'dev_server.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

console.log('Starting Next.js Dev Server via Node script...');
logStream.write(`Starting Next.js Dev Server via Node script at ${new Date().toISOString()}\n`);

const nextBin = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');
console.log(`Next binary path: ${nextBin}`);
logStream.write(`Next binary path: ${nextBin}\n`);

const env = { ...process.env, NEXT_TELEMETRY_DISABLED: '1' };

try {
    const child = spawn(process.execPath, [nextBin, 'dev', '-p', '3000'], {
        cwd: __dirname,
        env: env,
        stdio: ['ignore', 'pipe', 'pipe']
    });

    console.log(`Spawned process with PID: ${child.pid}`);
    logStream.write(`Spawned process with PID: ${child.pid}\n`);

    child.stdout.on('data', (data) => {
        // process.stdout.write(data); // Don't write to stdout to avoid cluttering captured output
        logStream.write(data);
    });

    child.stderr.on('data', (data) => {
        // process.stderr.write(data);
        logStream.write(data);
    });

    child.on('error', (err) => {
        console.error('Failed to start child process:', err);
        logStream.write(`Failed to start child process: ${err}\n`);
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        logStream.write(`Child process exited with code ${code}\n`);
        logStream.end();
    });
} catch (error) {
    console.error('Exception during spawn:', error);
    logStream.write(`Exception during spawn: ${error}\n`);
}
