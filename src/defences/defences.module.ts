import { Module } from '@nestjs/common';
import {DefencesController} from "./defences.controller";
import {DefencesService} from "./defences.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Defences} from "./defences.model";

@Module({
    controllers: [DefencesController],
    providers: [DefencesService],
    imports: [
        SequelizeModule.forFeature([Defences]),
    ],
    exports: [
        DefencesService
    ]
})

export class DefencesModule {}
