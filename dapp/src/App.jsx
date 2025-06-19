import { useEffect, useState } from "react";
import { connectWallet } from "./services/blockchainService";
import ProposalList from "./components/ProposalList";
import Header from "./components/Header";

function App() {
  const [account, setAccount] = useState(null);
  const [hasMetaMask, setHasMetaMask] = useState(true);

  const handleConnect = async () => {
    const userAddress = await connectWallet();
    if (userAddress) {
      setAccount(userAddress);
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      setHasMetaMask(false);
      return;
    }

    handleConnect();
  }, []);

  return (
    <div>
      <Header account={account} onConnect={handleConnect} />
      {!hasMetaMask ? (
        <p style={{ color: "red" }}>🦊 Veuillez installer MetaMask pour utiliser l’application.</p>
      ) : account ? (
        <ProposalList userAddress={account} />
      ) : (
        <p>Veuillez connecter votre portefeuille.</p>
      )}
    </div>
  );
}

export default App;
