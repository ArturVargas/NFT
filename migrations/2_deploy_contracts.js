const CypherToken = artifacts.require("Cypher");

module.exports = function (deployer) {
  deployer.deploy(CypherToken);
};
