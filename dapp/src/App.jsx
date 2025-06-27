import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProposalList from "./components/ProposalList";
import ResultsChart from "./components/ResultsChart";
import { connectWallet } from "./services/blockchainService";

function App() {
  const [account, setAccount] = useState(null);
  const [hasMetaMask, setHasMetaMask] = useState(true);
  const [proposals, setProposals] = useState([]);

  const handleConnect = async () => {
    const userAddress = await connectWallet();
    if (userAddress) {
      setAccount(userAddress);
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      setHasMetaMask(false);
    }
  }, []);

  return (
    <div>
      <Header account={account} onConnect={handleConnect} />
      {!hasMetaMask ? (
        <p style={{ color: "red" }}>Veuillez installer MetaMask pour utiliser l’application.</p>
      ) : account ? (
        <>
          <ProposalList userAddress={account} setProposals={setProposals} />
          {proposals.length > 0 && <ResultsChart proposals={proposals} />}
        </>
      ) : (
        <p>Veuillez connecter votre portefeuille.</p>
      )}
    </div>
  );
}

export default App;
