import { useEffect, useState } from "react";
import Web3 from "web3";
import ProposalCard from "./ProposalCard";
import { getProposals, voteProposal, hasUserVoted, isContractReady } from "../services/blockchainService";

function ProposalList({ userAddress }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votingIndex, setVotingIndex] = useState(null); // En cours
  const [hasVoted, setHasVoted] = useState(false);      // A voté
  const [votedIndex, setVotedIndex] = useState(null);   // Lequel

useEffect(() => {
  const fetchData = async () => {
    if (!isContractReady()) return;

    try {
      const voted = await hasUserVoted(userAddress);
      setHasVoted(voted);
      const data = await getProposals();
      setProposals(data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [userAddress]);


useEffect(() => {
  if (!window.ethereum || !userAddress) return;

  const setupListener = async () => {
    const contractJson = await import("../contracts/Vote.json");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractJson.default.abi, contractJson.default.address);

    const subscription = contract.events.VoteCast({}, async (err, event) => {
      if (err) return console.error("Erreur VoteCast", err);

      const updatedProposals = await getProposals();
      setProposals(updatedProposals);

      const voted = await hasUserVoted(userAddress);
      setHasVoted(voted);

      for (let i = 0; i < updatedProposals.length; i++) {
        if (updatedProposals[i].voteCount > proposals[i]?.voteCount) {
          setVotedIndex(i);
          break;
        }
      }
    });

    return () => {
      if (subscription.unsubscribe) subscription.unsubscribe();
    };
  };

  setupListener();
}, [userAddress]);

  const handleVote = async (index) => {
    setVotingIndex(index);

    const success = await voteProposal(index, userAddress);
    if (success) {
      setHasVoted(true);
      setVotedIndex(index);
      const updated = await getProposals();
      setProposals(updated);
    }

    setVotingIndex(null);
  };

  if (loading) return <p>Chargement des propositions...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Liste des propositions</h2>
      {proposals.length === 0 ? (
        <p>Aucune proposition trouvée.</p>
      ) : (
        proposals.map((p) => (
          <ProposalCard
            key={p.index}
            index={p.index}
            description={p.description}
            voteCount={p.voteCount}
            onVote={handleVote}
            hasVoted={hasVoted}
            votingIndex={votingIndex}
            votedIndex={votedIndex}
          />
        ))
      )}
    </div>
  );
}

export default ProposalList;