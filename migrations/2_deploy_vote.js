const Vote = artifacts.require("Vote");
const fs = require("fs");
const path = require("path");

module.exports = async function (deployer) {
  const initialProposals = [
    "Proposition A",
    "Proposition B",
    "Proposition C",
    "Proposition D",
    "Proposition E",
    "Proposition F",
    "Proposition G",
    "Proposition H"
  ];

  await deployer.deploy(Vote, initialProposals);
  const instance = await Vote.deployed();

  const contractData = {
    address: instance.address,
    abi: Vote.abi
  };

  const outputPath = path.resolve(__dirname, "../dapp/src/contracts/Vote.json");
  fs.writeFileSync(outputPath, JSON.stringify(contractData, null, 2));

  console.log("✅ Vote.json généré dans :", outputPath);
};