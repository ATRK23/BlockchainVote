function ProposalCard({ index, description, voteCount, onVote, hasVoted, votingIndex, votedIndex }) {
  const isVoting = votingIndex === index;
  const isDisabled = hasVoted || votingIndex !== null;
  const isVoted = votedIndex === index;

  let backgroundColor = "#edeceb"; // par défaut
  if (isVoting) backgroundColor = "#ffa500";     // orange
  else if (isVoted) backgroundColor = "#4caf50"; // vert
  else if (hasVoted) backgroundColor = "#ccc";   // gris foncé (autres boutons après vote)

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", margin: "1rem 0" }}>
      <h3>{index + 1}. {description}</h3>
      <p>{voteCount} vote(s)</p>
      <button
        onClick={() => onVote(index)}
        disabled={isDisabled}
        style={{
          backgroundColor,
          color: "black",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "5px",
          cursor: isDisabled ? "not-allowed" : "pointer"
        }}
      >
        {isVoting ? "Vote en cours..." : isVoted ? "Voté" : "Voter"}
      </button>
    </div>
  );
}

export default ProposalCard;