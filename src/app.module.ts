import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from './player/player.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {Player} from "./player/player.model";
import { AttacksModule } from './attacks/attacks.module';
import {DefencesModule} from "./defences/defences.module";
import {PlayerAttacks} from "./attacks/player-attacks.model";
import {Attacks} from "./attacks/attacks.model";
import {PlayerDefences} from "./defences/player-defences.model";
import {Defences} from "./defences/defences.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Player, PlayerAttacks, Attacks, PlayerDefences, Defences],
      autoLoadModels: true,
    }),
    PlayerModule,
    AttacksModule,
    DefencesModule
  ]
})

export class AppModule {}
