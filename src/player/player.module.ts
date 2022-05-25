import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {PlayerService} from "./player.service";
import {Player} from "./player.model";
import {AuthModule} from "../auth/auth.module";
import {Attacks} from "src/attacks/attacks.model";
import {PlayerAttacks} from "src/attacks/player-attacks.model";
import {AttacksModule} from "src/attacks/attacks.module";
import {DefencesModule} from "src/defences/defences.module";
import {PlayerDefences} from "src/defences/player-defences.model";
import { PlayerController } from "./player.controller";

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
  imports: [
    SequelizeModule.forFeature([Player, Attacks, PlayerAttacks, PlayerDefences]),
    AttacksModule,
    DefencesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    PlayerService
  ]
})

export class PlayerModule {}
