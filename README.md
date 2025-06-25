# Blockchain Vote – Application de Vote Électronique Sécurisée

## Objectif

Créer une application de vote électronique utilisant :
- Un **Smart Contract Ethereum** (Solidity),
- Un environnement local **Ganache CLI**,
- Une **DApp React** connectée à MetaMask.

---

## Prérequis

### 1. Installer Node.js & npm

```bash
sudo apt update
sudo apt install -y nodejs npm
```

#### Vérifier la version et l'installation
```bash
node -v     # Doit être ≥ 14
npm -v
```

### 2. Installer Truffle
```bash
npm install -g truffle
```

### 3. Installer Ganache
```bash
npm install -g ganache
```

### 4. Donner les droits d'execution au script de lancement
```bash
chmod +x run.sh
```

### 5. Configuration MetaMask
- Installer l'extension navigateur [MetaMask](https://metamask.io/)
- Lancer temporairement ganache pour qu'il soit détecté par MetaMask : 
```bash
ganache --port 8545 --chain.chainId 1337 --chain.networkId 1337 --wallet.seed "voteblockchain" --db ./ganache-data
```
- Importer un compte via une clé privée donnée dans la console de ganache

#### Créer un nouveau réseau personnalisé avec les paramètres suivants :
- URL par défaut du RPC : ```http://127.0.0.1:8545```
- ID de chaîne : ```1337```
- Symbole de la devise : ```ETH```

### 6. Selectionner ce réseau

## Utilisation

### - Dans un premier terminal : **Lancer ganache**
```bash
ganache --port 8545 --chain.chainId 1337 --chain.networkId 1337 --wallet.seed "voteblockchain" --db ./ganache-data
```

### - Dans un second terminal : Script de lancement
```bash
./run.sh
```

### - Se rendre sur le site web hebergé
- [http://localhost:5173/](http://localhost:5173/)

## Problèmes et développement

### 1. Remettre les compteurs de votes à zéro (entre autres)
Démarrer le script de lancement avec l'attribut ```true```

```bash
./run.sh true
```