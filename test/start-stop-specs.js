"use strict"

let chai = require('chai');
let ns = require('../index');
let should = chai.should();
let expect = chai.expect();
let fs = require('fs');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { exec } = require('child_process');
const { spawn } = require('child_process');

before(function(done) {
  done();
});

after(function(done) {
  done();
});

describe("Start/Stop ngrok,", function() {
  it('1.1 check it is installed from command line', function (done) {
    exec('ngrok', (err, stdout, stderr) => {
      if (err) {
        should.fail();
      }
      stderr.should.eql('');
      stdout.indexOf("ngrok http 80").should.be.gt(0);
      done();
    });
  });
  it('1.2 start it from command line', function () {
    const ngrok = spawn('ngrok', ['http', '8088']);
  });
  it('1.3 find the process id via command line', function (done) {
    exec('pgrep ngrok', (err, stdout, stderr) => {
      if (err) {
        should.fail();
      }
      console.log(`1.3 Process id is ${stdout}`);
      isNaN(parseInt(stdout)).should.equal(false);
      done();
    });
  });
  it('1.4 find the process id via api', function (done) {
    ns.pid((pid)=>{
      console.log(`1.4 Process id is ${pid}`);
      isNaN(parseInt(pid)).should.equal(false);
      done();
    });
  });
  it('1.5 kill it via command line', function (done) {
    ns.pid((pid) => {
      isNaN(pid).should.equal(false);
      console.log(`1.5 Process id is ${pid}`);
      exec(`kill -9 ${pid}`, (err, stdout, stderr) => {
        if (err) {
          should.fail();
        }
        stderr.should.eql('');
        done();
      });      
    });
  });
  it('1.6 start it via api', function () {
    const pid = ns.start((pid) => {
      console.log(`1.6 Process id is ${pid}`);
      isNaN(pid).should.equal(false);      
    });
  });
  xit('1.7 kill running process via api', function (done) {
    ns.kill((err) => {
      console.log(`1.7 Process id killed ${!err}`);
      err.should.equal(false);
      done();  
    });
  });
});

describe("Inspect,", function() {
  it('get tunnels XML from localhost:4040', function (done) {
    this.timeout(5000);
    ns.start((pid) => {
      setTimeout(() => {
        chai.request('localhost:4040')
          .get('/api/tunnels')
          .end((err, res) => {
            console.log(`Error: ${err}`);
            (err == null).should.equal(true);
            res.should.have.status(200);
            res.body.tunnels[0].config.addr.should.equal('localhost:8088');
            res.body.tunnels[0].public_url.should.contain('ngrok.io');        
            done();
        });        
      }, 3000);
    });
  });
  xit('get url', function (done) {
    ns.tunnels(0).public_url;
    should.fail();
  });
});

describe("Subscribe to event,", function() {
  xit('Receive on start event', function (done) {
    
  });
  xit('Receive on end event', function (done) {

  });
});