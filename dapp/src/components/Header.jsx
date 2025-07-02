function Header({ account, onConnect, error }) {
  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1>Système de Vote Blockchain</h1>
      {account ? (
        <p>Connecté : <strong>{account}</strong></p>
      ) : (
        <button onClick={onConnect}>Connecter MetaMask</button>
      )}
      {error && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
      )}
    </header>
  );
}

export default Header;
