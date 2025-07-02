#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

USE_RESET=${1:-false}

if [ "$USE_RESET" == "true" ]; then
  echo -e "${GREEN}[1/5] Nettoyage complet (reset activé)...${NC}"
  rm -rf build/
  rm -rf dapp/node_modules/
  rm -f dapp/src/contracts/Vote.json

else
  echo -e "${GREEN}[1/5] Pas de reset : aucun fichier supprimé.${NC}"
fi

if [ "$USE_RESET" == "true" ]; then
  echo -e "${GREEN}[2/5] Compilation et migration du Smart Contract avec --reset (remise à zéro des votes)...${NC}"
  truffle compile --all
  truffle migrate --reset
else
  echo -e "${GREEN}[2/5] Compilation et migration du Smart Contract (conserve les votes)...${NC}"
  truffle migrate
fi

echo -e "${GREEN}[3/5] Vérification du contrat généré...${NC}"
i=0
while [ ! -f dapp/src/contracts/Vote.json ] && [ $i -lt 10 ]; do
  echo "En attente de la génération de Vote.json..."
  sleep 0.5
  i=$((i+1))
done

if [ ! -f dapp/src/contracts/Vote.json ]; then
  echo -e "${RED}Vote.json toujours manquant. Abandon.${NC}"
  exit 1
fi

echo -e "${GREEN}[4/5] Installation des dépendances front-end...${NC}"
cd dapp && npm install

echo -e "${GREEN}[5/5] Lancement du front-end React sur http://localhost:3000 ...${NC}"
npm run dev
