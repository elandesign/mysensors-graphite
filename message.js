"use strict";

var config = require("./config.json");
var nodes = config.nodes;
var graphite = require('graphite-udp');
var metric = graphite.createClient(config.graphite);

class Message {
  constructor(nodeID, sensorID, messageType, ack, subType, payload) {
    this.nodeID = parseInt(nodeID);
    this.sensorID = parseInt(sensorID);
    this.messageType = parseInt(messageType);
    this.ack = parseInt(ack);
    this.subType = parseInt(subType);
    this.payload = payload;
  }

  isSensorReading() {
    return this.messageType == 1
  }

  process() {
    if(this.isSensorReading()) {
      console.log(`Sending ${this.payload} to ${this.path()}`);
      metric.put(this.path(), this.payload);
    }
  }

  path() {
    return `sensors.${this.node().name}.${this.sensor().type}`.toLowerCase();
  }

  node() {
    return nodes.find(function(node) {
      return node.id == this.nodeID;
    }.bind(this));
  }

  sensor() {
    return this.node().sensors.find(function(sensor){
      return sensor.id == this.sensorID;
    }.bind(this));
  }
}

module.exports = Message;
