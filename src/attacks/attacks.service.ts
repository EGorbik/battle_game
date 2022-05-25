import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Attacks} from "./attacks.model";

@Injectable()
export class AttacksService {
    constructor(@InjectModel(Attacks) private attacksRepository: typeof Attacks) {}

    async getAllAttacks() {
        const attacks = await this.attacksRepository.findAll({include: {all: true}});
        return attacks;
    }
}
