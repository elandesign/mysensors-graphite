"use strict";

var Message = require("./message");
var TCPClient = require('simpletcp').client();

class EthernetGateway {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.connect();
  }

  connect() {
    this.connection = new TCPClient('client1', this.host, this.port, this.onConnect.bind(this));
    this.connection.on("data", this.onMessage.bind(this));
    this.connection.open();
  }

  onConnect() {
    console.log(`Connected to serial gateway ${this.host}:${this.port}`);
  }

  onMessage(raw) {
    console.log(raw);
    new Message(...raw.split(";")).process();
  }

  onError(err) {
    console.log("Serial gateway error, reconnecting");
    this.connect();
  }
}

module.exports = EthernetGateway
