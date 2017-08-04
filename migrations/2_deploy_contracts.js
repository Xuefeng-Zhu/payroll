var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Payroll = artifacts.require("./Payroll.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Payroll, { from: accounts[0] });
};
