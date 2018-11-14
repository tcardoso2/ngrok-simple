"use strict"

const { exec } = require('child_process');
const { spawn } = require('child_process');
let request = require('request');

function pid(callback) {
  exec('pgrep ngrok', (err, stdout, stderr) => {
  	let first = stdout.split('\n')[0];
  	//console.log(`pid: stdout is ${stdout}, first line is "${first}"`);
    if (err || isNaN(first)) {
      callback(null);
      return;
    }
    callback(parseInt(first));
  });
}

function start(callback = (pid) => {}, type = 'http', port = '80') {
  spawn('ngrok', [type, port]);
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

function tunnels(id, callback) {
  try{
    request('http://localhost:4040/api/tunnels', function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      body = JSON.parse(body);
      console.log(`nr. of tunnels: ${body && body.tunnels ? body.tunnels.length : 'error'}`);
      let result = body ? (body.tunnels ? body.tunnels[id] : null) : null;
      if (callback){
        callback(error, result);
      }
    });    
  } catch(e) {
    callback(e.message, e);
  }
}

exports.pid = pid;
exports.start = start;
exports.kill = kill;
exports.tunnels = tunnels;