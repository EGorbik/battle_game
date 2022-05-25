import {getRandomValueFromInterval} from "./customRandom";

export const defensiveActions = (attackingPlayer, defendingPlayer, skillId) => {
    switch(skillId) {
        case 1:
            attackingPlayer.health = attackingPlayer.health + 10;
            defendingPlayer.health = -attackingPlayer.damage + defendingPlayer.health;
            attackingPlayer.skills = `Heal: Restores 10 health`;
            return [attackingPlayer, defendingPlayer]
        case 2:
            attackingPlayer.health = attackingPlayer.health + 20;
            defendingPlayer.health = -attackingPlayer.damage + defendingPlayer.health;
            attackingPlayer.skills = `Power Heal: Restores 20 health`;
            return [attackingPlayer, defendingPlayer]
        case 3:
            attackingPlayer.health = 0;
            defendingPlayer.health = -attackingPlayer.damage + defendingPlayer.health;
            defendingPlayer.damage = 0;
            attackingPlayer.skills = `Shield: Prevent all damage done this turn`;
            return [attackingPlayer, defendingPlayer]
        case 4:
            const totalDamage = defendingPlayer.health - attackingPlayer.damage;
            defendingPlayer.health = function () {
                return -this.damage + totalDamage
            };
            attackingPlayer.skills = `Counterattack: If received damage this turn – do the same amount to your opponent`;
            return [attackingPlayer, defendingPlayer]
        case 5:
            let pr = getRandomValueFromInterval(50,60)
            defendingPlayer.damage = defendingPlayer.damage * pr/100;
            defendingPlayer.health = -attackingPlayer.damage + defendingPlayer.health;
            attackingPlayer.health = typeof attackingPlayer.health === 'number' ? attackingPlayer.health * pr/100 : attackingPlayer.health() * pr/100;
            attackingPlayer.skills = `Miss chance of your opponent = ${pr}%`;
            return [attackingPlayer, defendingPlayer]
    }
}