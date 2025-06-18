import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS, NETWORK_ID } from "../utils/constant";

let web3;
let contract;

/**
 * Initialise Web3 et connecte à MetaMask.
 */
export async function connectWallet() {
  if (!window.ethereum) {
    alert("Veuillez installer MetaMask.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);

    const currentNetworkId = await web3.eth.net.getId();
    if (currentNetworkId.toString() !== NETWORK_ID) {
      alert(`Connectez-vous au réseau Ganache (ID attendu : ${NETWORK_ID})`);
      return null;
    }

    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    return accounts[0]; // retourne l’adresse connectée
  } catch (error) {
    console.error("Erreur lors de la connexion à MetaMask :", error);
    return null;
  }
}

/**
 * Récupère le nombre total de propositions.
 */
export async function getNumProposals() {
  if (!contract) return 0;
  return await contract.methods.getNumProposals().call();
}

/**
 * Récupère toutes les propositions (description + nombre de votes).
 */
export async function getProposals() {
  if (!contract) return [];

  const count = await getNumProposals();
  const proposals = [];

  for (let i = 0; i < count; i++) {
    const { description, voteCount } = await contract.methods.getProposal(i).call();
    proposals.push({ index: i, description, voteCount: parseInt(voteCount) });
  }

  return proposals;
}

/**
 * Vérifie si l’utilisateur a déjà voté.
 * @param {string} address - adresse Ethereum de l’utilisateur
 */
export async function hasUserVoted(address) {
  if (!contract) return false;
  return await contract.methods.hasUserVoted(address).call();
}

/**
 * Vote pour une proposition (par son index)
 * @param {number} index - index de la proposition
 * @param {string} from  - adresse de l’utilisateur
 */
export async function voteProposal(index, from) {
  if (!contract || !from) return;

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
  if (!contract || !from || !description) return;

  try {
    await contract.methods.addProposal(description).send({ from });
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la proposition :", error);
    return false;
  }
}
