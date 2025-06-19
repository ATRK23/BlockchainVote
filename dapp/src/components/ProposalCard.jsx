function ProposalCard({ index, description, voteCount }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", margin: "1rem 0" }}>
      <h3>{index + 1}. {description}</h3>
      <p>{voteCount} vote(s)</p>
      <button disabled>Voter</button> {/* bouton désactivé pour l'instant */}
    </div>
  );
}

export default ProposalCard;
