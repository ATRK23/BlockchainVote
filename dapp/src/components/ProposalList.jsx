import { useEffect, useState } from "react";
import { getProposals } from "../services/blockchainService";
import ProposalCard from "./ProposalCard";

function ProposalList({ userAddress }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await getProposals();
        setProposals(data);
      } catch (error) {
        console.error("Erreur lors du chargement des propositions :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

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
          />
        ))
      )}
    </div>
  );
}

export default ProposalList;
