import voteContract from "../contract/Vote.json";

export const CONTRACT_ABI = voteContract.abi;

// ⚠️ À adapter après chaque déploiement local
// Adresse du contrat déployé sur Ganache 
export const CONTRACT_ADDRESS = "0xb92D50aFC71c4e6f84c41De25F89a07CA89A1891";

// ⚠️ À adapter après chaque déploiement local
// ID du réseau Ganache 
export const NETWORK_ID = "1750111615810"; 
