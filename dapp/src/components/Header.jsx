function Header({ account, onConnect }) {
  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1>Système de Vote Blockchain</h1>
      {account ? (
        <p>Connecté : <strong>{account}</strong></p>
      ) : (
        <button onClick={onConnect}>Connecter MetaMask</button>
      )}
    </header>
  );
}

export default Header;
