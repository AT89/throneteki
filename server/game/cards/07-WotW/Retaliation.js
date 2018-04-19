const PlotCard = require('../../plotcard.js');

class Retaliation extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.getPlayers().length > 1,
            targetType: 'player',
            targetController: 'current',
            effect: ability.effects.canSelectAsFirstPlayer(player => player !== this.controller)
        });
    }
}

Retaliation.code = '07047';

module.exports = Retaliation;
