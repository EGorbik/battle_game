import { Module } from '@nestjs/common';
import {AttacksController} from "./attacks.controller";
import {AttacksService} from "./attacks.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Attacks} from "./attacks.model";
import {Player} from "../player/player.model";
import {PlayerAttacks} from "./player-attacks.model";

@Module({
    controllers: [AttacksController],
    providers: [AttacksService],
    imports: [
        SequelizeModule.forFeature([Attacks, Player, PlayerAttacks]),
    ],
    exports: [
        AttacksService
    ]
})

export class AttacksModule {}
