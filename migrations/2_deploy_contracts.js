var HelloWorld = artifacts.require("./HelloWorld.sol");
var Todo       = artifacts.require("./Todo.sol");

module.exports = function(deployer) {
  deployer.deploy(Todo);  
  deployer.deploy(HelloWorld);
};
