#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN} Lancement de Ganache sur le port 8545, sur l'ID 1337, avec la seed de génération "voteblockchain" à partir des données stockées dans ./ganache-data${NC}"
ganache --port 8545 --chain.chainId 1337 --chain.networkId 1337 --wallet.seed "voteblockchain" --db ./ganache-data