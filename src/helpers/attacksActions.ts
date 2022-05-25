import {getRandomValueFromInterval} from "./customRandom";

export const attacksActions = (attackingPlayer, defendingPlayer, skillId) => {
    switch(skillId) {
        case 1:
            defendingPlayer.health = -attackingPlayer.damage;
            attackingPlayer.skills = `Simple attack: Does regular damage`;
            return [attackingPlayer, defendingPlayer]
        case 2:
            attackingPlayer.damage = attackingPlayer.damage * 0.5;
            defendingPlayer.health = -attackingPlayer.damage + defendingPlayer.health;
            attackingPlayer.skills = `Weak attack: Does 50% damage`;
            return [attackingPlayer, defendingPlayer]
        case 3:
            attackingPlayer.damage = attackingPlayer.damage * 2;
            defendingPlayer.health = -attackingPlayer.damage + defendingPlayer.health;
            attackingPlayer.skills = `Heavy attack: Does double damage`;
            return [attackingPlayer, defendingPlayer]
        case 4:
            let koef = getRandomValueFromInterval(1,0);
            attackingPlayer.damage = attackingPlayer.damage * (koef ? 3 : 0);
            defendingPlayer.health = -attackingPlayer.damage + defendingPlayer.health;
            attackingPlayer.skills = `Risky attack: ${koef ? 'triple damage' : 'do no damage'} in this turn`
            return [attackingPlayer, defendingPlayer]
    }
}