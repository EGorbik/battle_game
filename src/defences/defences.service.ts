import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Defences} from "./defences.model";

@Injectable()
export class DefencesService {
    constructor(@InjectModel(Defences) private defencesRepository: typeof Defences) {}

    async getAllDefences() {
        const defences = await this.defencesRepository.findAll({include: {all: true}});
        return defences;
    }
}
