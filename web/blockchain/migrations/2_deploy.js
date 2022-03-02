const Migrations = artifacts.require("Scheduling");

module.exports = function(deployer){
    deployer.deploy(Migrations);
};