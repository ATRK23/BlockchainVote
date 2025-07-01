import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { connectWallet, isContractReady } from '../src/services/blockchainService';

// Mock du service blockchain
vi.mock('../src/services/blockchainService', () => ({
  connectWallet: vi.fn(),
  isContractReady: vi.fn(() => true),
  getProposals: vi.fn(() => Promise.resolve([])),
  hasUserVoted: vi.fn(() => Promise.resolve(false)),
}));

// Mock des composants enfants pour éviter les erreurs
vi.mock('../src/components/ProposalList', () => ({
  default: ({ userAddress, setProposals }) => (
    <div data-testid="proposal-list">ProposalList - User: {userAddress}</div>
  )
}));

vi.mock('../src/components/ResultsChart', () => ({
  default: ({ proposals }) => (
    <div data-testid="results-chart">ResultsChart</div>
  )
}));

describe('App Component (Vitest)', () => {
  const mockEthereum = {
    request: vi.fn(),
    on: vi.fn(),
    removeListener: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Simuler la présence de MetaMask par défaut
    Object.defineProperty(window, 'ethereum', {
      value: mockEthereum,
      writable: true,
      configurable: true
    });
  });

  it("affiche l'adresse après connexion MetaMask", async () => {
    const mockAddress = '0x1234...abcd';
    connectWallet.mockResolvedValue(mockAddress);

    render(<App />);

    // Vérifier l'état initial
    expect(screen.getByText(/veuillez connecter votre portefeuille/i)).toBeInTheDocument();

    // Cliquer sur le bouton de connexion
    const bouton = screen.getByText(/connecter metamask/i);
    fireEvent.click(bouton);

    // Attendre que la connexion soit établie
    await waitFor(() => {
      expect(connectWallet).toHaveBeenCalled();
    });

    // Vérifier que le composant ProposalList est affiché avec l'adresse
    await waitFor(() => {
      const proposalList = screen.getByTestId('proposal-list');
      expect(proposalList).toBeInTheDocument();
      expect(proposalList).toHaveTextContent(mockAddress);
    });

    // Vérifier que le message de connexion a disparu
    expect(screen.queryByText(/veuillez connecter votre portefeuille/i)).not.toBeInTheDocument();
  });

  it('affiche un message si MetaMask est absent', () => {
    // Supprimer window.ethereum pour simuler l'absence de MetaMask
    delete window.ethereum;

    render(<App />);
    
    expect(screen.getByText(/veuillez installer metamask/i)).toBeInTheDocument();
    });

  it('affiche le message de connexion quand MetaMask est présent mais non connecté', () => {
    render(<App />);
    
    expect(screen.getByText(/veuillez connecter votre portefeuille/i)).toBeInTheDocument();
    expect(screen.getByText(/connecter metamask/i)).toBeInTheDocument();
  });

  it('gère les erreurs de connexion', async () => {
    connectWallet.mockRejectedValue(new Error('Connexion refusée'));

    render(<App />);

    const bouton = screen.getByText(/connecter metamask/i);
    fireEvent.click(bouton);

    await waitFor(() => {
      expect(connectWallet).toHaveBeenCalled();
    });

    // L'utilisateur reste non connecté
    expect(screen.getByText(/veuillez connecter votre portefeuille/i)).toBeInTheDocument();
  });
});