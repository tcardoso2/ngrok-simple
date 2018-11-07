"use strict"

let chai = require('chai');
let ns = require('../index');
let should = chai.should();
let expect = chai.expect();
let fs = require('fs');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { exec } = require('child_process');

before(function(done) {
  done();
});

after(function(done) {
  done();
});

describe("Start/Stop ngrok,", function() {
  it('check it is installed from command line', function (done) {
    exec('ngrok', (err, stdout, stderr) => {
      if (err) {
        should.fail();
      }
      stderr.should.eql('');
      stdout.indexOf("ngrok http 80").should.be.gt(0);
      done();
    });
  });
  xit('kill it via command line', function (done) {

  });
  xit('start it via api', function (done) {
    ns.start();
  });
  xit('get running process via api', function (done) {
    ns.ps();
  });
  xit('kill running process via api', function (done) {
    ns.kill();
  });
});

describe("Inspect,", function() {
  it('get tunnels XML from localhost:4040', function (done) {
    chai.request('localhost:4040')
      .get('/api/tunnels')
      .end((err, res) => {
        (err == null).should.equal(true);
        res.should.have.status(200);
        res.body.tunnels[0].config.addr.should.equal('localhost:80');
        res.body.tunnels[0].public_url.should.contain('ngrok.io');        
        done();
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