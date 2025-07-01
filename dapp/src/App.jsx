import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProposalList from "./components/ProposalList";
import ResultsChart from "./components/ResultsChart";
import { connectWallet } from "./services/blockchainService";

function App() {
  const [account, setAccount] = useState(null);
  const [hasMetaMask, setHasMetaMask] = useState(true);
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    try {
      const userAddress = await connectWallet();
      if (userAddress) {
        setAccount(userAddress);
        setError("");
      } else {
        setError("Connexion refusée ou réseau incorrect.");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError("Échec de la connexion à MetaMask.");
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      setHasMetaMask(false);
    }
  }, []);

  return (
    <div>
      <Header account={account} onConnect={handleConnect} error={error} />

      {!hasMetaMask ? (
        <p style={{ color: "red" }}>
          Veuillez installer MetaMask pour utiliser l’application.
        </p>
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
