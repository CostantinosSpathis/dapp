const Dapp = artifacts.require("Dapp");

module.exports = function(deployer) {
  deployer.deploy(Dapp);
};
