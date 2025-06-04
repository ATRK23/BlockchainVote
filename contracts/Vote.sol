// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vote {

    // Adresse du créateur du contrat (admin)
    address public owner;
    
    // Structure représentant une proposition
    struct Proposal {
        string description;  // Description de la proposition
        uint voteCount;     // Nombre de votes reçus
    }
    
    // Tableau dynamique stockant toutes les propositions
    Proposal[] public proposals;
    
    // Mapping pour suivre qui a déjà voté (protection contre les doubles votes)
    mapping(address => bool) public hasVoted;
    
    // Événements
    event VoteCast(address indexed voter, uint indexed proposalIndex);
    event ProposalAdded(uint indexed proposalIndex, string description);
    
    constructor(string[] memory proposalNames) {
        // Initialiser l'admin du contrat
        owner = msg.sender;
        // Initialisation des propositions avec un voteCount à 0
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                description: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    // Modificateur de restriction : seul l'admin peut appeler certaines fonctions
    modifier onlyOwner() {
        require(msg.sender == owner, "Seul l'administrateur peut effectuer cette action");
        _;
    }
    
    function vote(uint proposalIndex) external {
        // Vérifier que l'utilisateur n'a pas encore voté
        require(!hasVoted[msg.sender], "Vous avez deja vote");
        
        // Vérifier que l'index de la proposition est valide
        require(proposalIndex < proposals.length, "Index de proposition invalide");
        
        // Enregistrer le vote
        proposals[proposalIndex].voteCount++;
        
        // Marquer l'utilisateur comme ayant voté
        hasVoted[msg.sender] = true;
        
        // Émettre l'événement de vote
        emit VoteCast(msg.sender, proposalIndex);
    }
    
    function getProposal(uint index) external view returns (string memory description, uint voteCount) {
        require(index < proposals.length, "Index de proposition invalide");
        
        Proposal memory proposal = proposals[index];
        return (proposal.description, proposal.voteCount);
    }

    //Permet à l'admin d'ajouter une proposition dynamiquement
    function addProposal(string memory description) external onlyOwner {
        proposals.push(Proposal({
            description: description,
            voteCount: 0
        }));
        emit ProposalAdded(proposals.length - 1, description);
    }
    
    
    function getNumProposals() external view returns (uint) {
        return proposals.length;
    }
    
    
    function getAllProposals() external view returns (Proposal[] memory) {
        return proposals;
    }
    
    
    function hasUserVoted(address voter) external view returns (bool) {
        return hasVoted[voter];
    }
}