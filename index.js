"use strict"

const { exec } = require('child_process');
const { spawn } = require('child_process');

function pid(callback) {
  exec('pgrep ngrok', (err, stdout, stderr) => {
  	let first = stdout.split('\n')[0];
  	console.log(`pid: stdout is ${stdout}, first line is "${first}"`);
    if (err || isNaN(first)) {
      callback(null);
      return;
    }
    callback(parseInt(first));
  });
}

function start(callback) {
  spawn('ngrok', ['http', '8088']);
  pid(callback);
}

function kill(callback) {
  pid((id) => {
  	exec(`kill -9 ${id}`, (err, stdout, stderr) => {
      if (err) {
        callback(err);
      }
      //Verify once more process is actually killed
      pid((secondId) => {
      	callback(isNaN(secondId));
      })    
    });
  });
}

exports.pid = pid;
exports.start = start;
exports.kill = kill;