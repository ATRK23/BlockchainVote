import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProposalList from "../src/components/ProposalList";
import * as blockchainService from "../src/services/blockchainService";

// Mock complet du service blockchain
vi.mock("../src/services/blockchainService", () => ({
  getProposals: vi.fn(),
  hasUserVoted: vi.fn(),
  voteProposal: vi.fn(),
  isContractReady: vi.fn(() => true), 
}));

describe("ProposalList Component", () => {
  const fakeUser = "0x1234567890abcdef";
  const mockSetProposals = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche toutes les propositions retournées par getProposals()", async () => {
    blockchainService.getProposals.mockResolvedValue([
      { index: 0, description: "Proposition A", voteCount: 5 },
      { index: 1, description: "Proposition B", voteCount: 8 }
    ]);
    blockchainService.hasUserVoted.mockResolvedValue(false);

    render(<ProposalList userAddress={fakeUser} setProposals={mockSetProposals} />);

    expect(await screen.findByText(/Proposition A/)).toBeInTheDocument();
    expect(await screen.findByText(/Proposition B/)).toBeInTheDocument();
  });

  it("appelle voteProposal() lorsqu'on clique sur le bouton Voter", async () => {
    blockchainService.getProposals.mockResolvedValue([
      { index: 0, description: "Proposition Test", voteCount: 3 }
    ]);
    blockchainService.hasUserVoted.mockResolvedValue(false);
    blockchainService.voteProposal.mockResolvedValue(true);

    render(<ProposalList userAddress={fakeUser} setProposals={mockSetProposals} />);

    const voteButton = await screen.findByRole("button", { name: /voter/i });
    fireEvent.click(voteButton);

    await waitFor(() => {
      expect(blockchainService.voteProposal).toHaveBeenCalledWith(0, fakeUser);
    });
  });
});
