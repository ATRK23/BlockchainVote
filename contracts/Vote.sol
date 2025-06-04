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

}