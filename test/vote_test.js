const Vote = artifacts.require("Vote");

contract("Vote", accounts => {
    const [admin, voter1, voter2] = accounts;
    const proposals = ["Proposition A", "Proposition B", "Proposition C"];

    let voteInstance;

    beforeEach(async () => {
        voteInstance = await Vote.new(proposals, { from: admin });
    });

    it("initialise correctement les propositions", async () => {
        const num = await voteInstance.getNumProposals();
        assert.equal(num.toNumber(), proposals.length, "Le nombre de propositions est incorrect");

        const prop = await voteInstance.getProposal(0);
        assert.equal(prop.description, proposals[0], "Description incorrecte");
        assert.equal(prop.voteCount.toNumber(), 0, "Le compteur devrait être à 0");
    });

    it("permet à un utilisateur de voter", async () => {
        await voteInstance.vote(1, { from: voter1 });

        const prop = await voteInstance.getProposal(1);
        assert.equal(prop.voteCount.toNumber(), 1, "Le vote n’a pas été enregistré");

        const hasVoted = await voteInstance.hasUserVoted(voter1);
        assert.equal(hasVoted, true, "Le mapping hasVoted n’a pas été mis à jour");
    });

    it("rejette un second vote par le même utilisateur", async () => {
        await voteInstance.vote(0, { from: voter1 });

        try {
            await voteInstance.vote(2, { from: voter1 });
            assert.fail("Le contrat aurait dû rejeter le deuxième vote");
        } catch (err) {
            assert.include(err.message, "Vous avez deja vote", "Erreur incorrecte");
        }
    });

    it("rejette un index de proposition invalide", async () => {
        try {
            await voteInstance.vote(99, { from: voter2 });
            assert.fail("Le contrat aurait dû rejeter l'index invalide");
        } catch (err) {
            assert.include(err.message, "Index de proposition invalide", "Erreur incorrecte");
        }
    });

    it("permet à l'admin d'ajouter une proposition", async () => {
    await voteInstance.addProposal("Proposition D", { from: admin });

    const num = await voteInstance.getNumProposals();
    assert.equal(num.toNumber(), 4, "La proposition n’a pas été ajoutée");

    const newProp = await voteInstance.getProposal(3);
    assert.equal(newProp.description, "Proposition D", "La description de la nouvelle proposition est incorrecte");
    });

    it("rejette l'ajout d'une proposition par un non-admin", async () => {
    try {
        await voteInstance.addProposal("Proposition E", { from: voter1 });
        assert.fail("L'ajout aurait dû échouer");
    } catch (err) {
        assert.include(err.message, "Seul l'administrateur", "Erreur non liée au contrôle d'accès");
    }
    });
});