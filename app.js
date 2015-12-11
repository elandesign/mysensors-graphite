var config = require("./config.json");
var Gateway = require("./ethernetGateway.js");

new Gateway(config.gateway.host, config.gateway.port);
