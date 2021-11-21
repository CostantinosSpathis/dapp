const designVoting = artifacts.require("designVoting");

module.exports = function(deployer) {
  deployer.deploy(designVoting);
};
