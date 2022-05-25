import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Player} from "./player.model";
import {loggerTurn} from "./logger";
import {generateTwoRandomNumbersFromInterval} from "../helpers/customRandom";
import {attacksActions} from "../helpers/attacksActions";
import {defensiveActions} from "../helpers/defensiveActions";
import {generateRandomStats} from "../helpers/generateRandomStats";
import {AttacksService} from "../attacks/attacks.service";
import {DefencesService} from "../defences/defences.service";
import {CreatePlayerDto} from "./dto/create-player.dto";
import {TurnDto} from "./dto/turn.dto";

enum Actions {
    AttacksAction = 'attacks',
    DefencesAction = 'defences'
}

const actions = {
    attacks: attacksActions,
    defences: defensiveActions
}

@Injectable()
export class PlayerService {
    constructor(@InjectModel(Player) private playerRepository: typeof Player,
                private attacksService: AttacksService,
                private defencesService: DefencesService) {}

    async createPlayer(dto: CreatePlayerDto) {
        try {
            let {strength, constitution, damage, health, orderSkills} = generateRandomStats();
            let attacks = await this.attacksService.getAllAttacks();
            let defences = await this.defencesService.getAllDefences();
            let attacksIds = generateTwoRandomNumbersFromInterval(1, attacks.length);
            let defencesIds = generateTwoRandomNumbersFromInterval(1, defences.length);
            let resultPlayer = { ...dto, strength, constitution, damage, health, orderSkills };
            const player = await this.playerRepository.create(resultPlayer);
            await player.$set('attacks', attacksIds)
            await player.$set('defences', defencesIds)
            return player;
        } catch (e) {
            if(e && e.errors && e.errors[0] && e.errors[0].message) {
                throw new HttpException(e.errors[0].message, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async getPlayerById(id: string) {
        const player = await this.playerRepository.findOne({where: {id}, include: {all: true}})
        return player;
    }

    async gameTurn(data: TurnDto) {
        const firstPlayer =  await this.playerRepository.findOne({where: {id: data.ids[0]}, include: {all: true}})
        const secondPlayer =  await this.playerRepository.findOne({where: {id: data.ids[1]}, include: {all: true}})

        if(firstPlayer.health <= 0 || secondPlayer.health <= 0) {
            return {
                message: 'One of the players does not have enough health'
            }
        }

        let firstSkill = [
            ...firstPlayer.attacks.map(el => {
                return {
                    ...el['dataValues'],
                    actionType: Actions.AttacksAction
                }
            }),
            ...firstPlayer.defences.map(el => {
                return {
                    ...el['dataValues'],
                    actionType: Actions.DefencesAction
                }
            })
        ]

        let secondSkill = [
            ...secondPlayer.attacks.map(el => {
                return {
                    ...el['dataValues'],
                    actionType: Actions.AttacksAction
                }
            }),
            ...secondPlayer.defences.map(el => {
                return {
                    ...el['dataValues'],
                    actionType: Actions.DefencesAction
                }
            })
        ]

        let firstHealth = firstPlayer.health;
        let secondHealth = secondPlayer.health;
        firstPlayer.health = 0;
        secondPlayer.health = 0;

        let [ firstPlayerUpdated, secondPlayerUpdated ] = actions[firstSkill[firstPlayer.orderSkills].actionType](firstPlayer, secondPlayer, firstSkill[firstPlayer.orderSkills].id);
        let [ secondPlayerFinal, firstPlayerFinal ] = actions[secondSkill[secondPlayer.orderSkills].actionType](secondPlayerUpdated, firstPlayerUpdated, secondSkill[secondPlayer.orderSkills].id);

        let firstPlayerLostHealth = (typeof firstPlayerFinal.health === 'number') ? firstPlayerFinal.health : firstPlayerFinal.health();
        let secondPlayerLostHealth = (typeof secondPlayerFinal.health === 'number') ? secondPlayerFinal.health : secondPlayerFinal.health();

        let firstResultHealth = firstHealth + firstPlayerLostHealth;
        let secondResultHealth = secondHealth + secondPlayerLostHealth;

        await this.playerRepository.update({
            orderSkills: firstPlayer.orderSkills === 3 ? 0 : firstPlayer.orderSkills + 1,
            health: firstResultHealth
        }, { where: { id: firstPlayer.id } });

        await this.playerRepository.update({
            orderSkills: secondPlayer.orderSkills === 3 ? 0 : secondPlayer.orderSkills + 1,
            health: secondResultHealth
        }, { where: { id: secondPlayer.id } });

        if(firstResultHealth <= 0 || secondResultHealth <= 0) { return { message: 'Game over' } }

        loggerTurn('First', firstPlayerFinal.skills, firstPlayerFinal.damage, firstPlayerLostHealth, firstHealth);
        loggerTurn('Second', secondPlayerFinal.skills, secondPlayerFinal.damage, secondPlayerLostHealth, secondHealth);

        return { status: 'success' }
    }

    async getPlayerByLogin(login: string) {
        const player = await this.playerRepository.findOne({where: {login}, include: {all: true}})
        return player;
    }
}
