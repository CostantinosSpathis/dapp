const Migrations = artifacts.require("designVoting");

module.exports = function(deployer){
    deployer.deploy(Migrations);
};