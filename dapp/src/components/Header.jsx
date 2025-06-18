import React, { useState } from "react";
import { connectWallet } from "../services/blockchainService";

const Header = ({ onAddressConnected }) => {
  const [address, setAddress] = useState(null);

  const handleConnect = async () => {
    const userAddress = await connectWallet();
    if (userAddress) {
      setAddress(userAddress);
      onAddressConnected(userAddress);
    }
  };

  return (
    <header style={{ marginBottom: "2rem" }}>
      <h1>Système de Vote Blockchain</h1>
      {address ? (
        <p>Connecté : <strong>{address}</strong></p>
      ) : (
        <button onClick={handleConnect}>Connecter MetaMask</button>
      )}
    </header>
  );
};

export default Header;
