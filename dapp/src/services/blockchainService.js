import Web3 from "web3";

let web3;
let contract;

/**
 * Charge le contrat en mémoire depuis Vote.json et Web3
 */
export async function getWeb3Contract() {
  if (!window.ethereum) throw new Error("MetaMask non détecté");
  if (!web3) web3 = new Web3(window.ethereum);

  const contractJson = await import("../contracts/Vote.json");
  contract = new web3.eth.Contract(contractJson.default.abi, contractJson.default.address);
  return contract;
}

/**
 * Vérifie si le contrat est initialisé (utile pour le front)
 */
export function isContractReady() {
  return !!contract;
}

/**
 * Initialise Web3 et connecte à MetaMask.
 */
export async function connectWallet() {
  if (!window.ethereum) {
    alert("Veuillez installer MetaMask.");
    return null;
  }

  try {
    const existingAccounts = await window.ethereum.request({ method: "eth_accounts" });

    await getWeb3Contract(); // initialise web3 + contract

    if (existingAccounts.length > 0) {
      return existingAccounts[0];
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (error) {
    console.error("Erreur lors de la connexion à MetaMask :", error);
    return null;
  }
}

/**
 * Récupère le nombre total de propositions.
 */
export async function getNumProposals() {
  const contract = await getWeb3Contract();
  return await contract.methods.getNumProposals().call();
}

/**
 * Récupère toutes les propositions (description + nombre de votes).
 */
export async function getProposals() {
  const contract = await getWeb3Contract();
  const count = await contract.methods.getNumProposals().call();
  const proposals = [];

  for (let i = 0; i < count; i++) {
    const result = await contract.methods.getProposal(i).call();
    proposals.push({
      index: i,
      description: result[0],
      voteCount: parseInt(result[1]),
    });
  }

  return proposals;
}

/**
 * Vérifie si l’utilisateur a déjà voté.
 * @param {string} address - adresse Ethereum de l’utilisateur
 */
export async function hasUserVoted(address) {
  const contract = await getWeb3Contract();
  return await contract.methods.hasUserVoted(address).call();
}

/**
 * Vote pour une proposition (par son index)
 * @param {number} index - index de la proposition
 * @param {string} from  - adresse de l’utilisateur
 */
export async function voteProposal(index, from) {
  const contract = await getWeb3Contract();
  if (!from) return;

  try {
    await contract.methods.vote(index).send({ from });
    return true;
  } catch (error) {
    console.error("Erreur lors du vote :", error);
    return false;
  }
}

/**
 * Permet à l'admin d'ajouter une proposition (seulement si c'est l'owner).
 * @param {string} description - La description de la nouvelle proposition
 * @param {string} from - L'adresse Ethereum de l'utilisateur (doit être l'admin)
 */
export async function addProposal(description, from) {
  const contract = await getWeb3Contract();
  if (!from || !description) return;

  try {
    await contract.methods.addProposal(description).send({ from });
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la proposition :", error);
    return false;
  }
}