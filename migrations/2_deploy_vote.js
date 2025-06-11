const Vote = artifacts.require("Vote");

module.exports = function (deployer) {
  const proposals = ["Proposition 1, Proposition 2, Proposition 3"];
  deployer.deploy(Vote, proposals);
};