# BlockchainVote
USPN projet blockchain

## Utilisation

lancer ganache avec ```ganache --chain.chainId 1337 --chain.networkId 1337``` (pour le lance sur l'ID de serveur 1337 par défaut),
compiler les contracts avec ```truffle compile --all && truffle migrate --reset``` dans un autre terminal

lancer la page react avec ```cd dapp && npm install && npm run dev```,
la page web se trouve normalement à l'adresse suivante : ```http://localhost:5173/``` (vérifier dans la console de npm)

créer un compte metamask, ajouter un nouveau réseau personnalisé à ce compte avec les informations de ganache, puis selectionner ce réseau.

lorsque vous cliquez sur le bouton "connecter wallet", l'adresse s'affiche. Vous pouvez aussi observer les différentes proposition disponibles