#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}[1/5] Nettoyage des anciens fichiers...${NC}"
rm -rf build/
rm -rf dapp/node_modules/
rm -f dapp/src/contracts/Vote.json
#pour eviter les mauvaises compilation a cause du cache

echo -e "${GREEN}[2/5] Compilation et migration du Smart Contract...${NC}"
truffle migrate --reset

echo -e "${GREEN}[3/5] Vérification du contrat généré...${NC}"
if [ ! -f dapp/src/contracts/Vote.json ]; then
  echo "Vote.json manquant. Vérifier script 2_deploy_vote.js"
  exit 1
fi

echo -e "${GREEN}[4/5] Installation des dépendances front-end...${NC}"
cd dapp && npm install

echo -e "${GREEN}[5/5] Lancement du front-end React sur http://localhost:3000 ...${NC}"
npm run dev
