const DrawCard = require('../../drawcard.js');

class TheWatchHasNeed extends DrawCard {

    setupCardAbilities() {
        this.action({
            title: 'Search for a character',
            handler: () => {
                this.game.promptWithMenu(this.controller, this, {
                    activePrompt: {
                        menuTitle: 'Select a trait',
                        buttons: [
                            { text: 'Builder', method: 'setTrait', arg: 'Builder' },
                            { text: 'Ranger', method: 'setTrait', arg: 'Ranger' },
                            { text: 'Steward', method: 'setTrait', arg: 'Steward' },
                            { text: 'Cancel', method: 'cancelTraitSelection' }
                        ]
                    },
                    source: this
                });
            }
        });
    }

    setTrait(player, trait) {
        let reserve = player.getTotalReserve();

        this.game.promptForDeckSearch(this.controller, {
            numCards: reserve,
            numToSelect: reserve, // player can stop earlier clicking Done when happy
            activePromptTitle: 'Select a card',
            cardCondition: card => card.getType() === 'character' && card.hasTrait(trait),
            onSelect: (player, cards) => this.cardsSelected(player, trait, cards),
            onCancel: player => this.doneSelecting(player, trait),
            source: this
        });

        return true;
    }

    cardsSelected(player, trait, cards) {
        for(let card of cards) {
            player.moveCard(card, 'hand');
        }
        this.game.addMessage('{0} uses {1} to search their deck for a {2} and add {3} to their hand',
            player, this, trait, cards);

        return true;
    }

    cancelTraitSelection(player) {
        this.game.addAlert('danger', '{0} cancels the effect of {1}', player, this);

        return true;
    }

    doneSelecting(player, trait) {
        this.game.addMessage('{0} uses {1} to search their deck for a {2}, but does not add any card to their hand',
            player, this, trait);

        return true;
    }
}

TheWatchHasNeed.code = '02002';

module.exports = TheWatchHasNeed;
