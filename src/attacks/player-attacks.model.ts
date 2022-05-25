import {Column, DataType, Model, Table,ForeignKey} from "sequelize-typescript";
import {Player} from "../player/player.model";
import {Attacks} from "./attacks.model";

@Table({tableName: 'player_attacks', createdAt: false, updatedAt: false})
export class PlayerAttacks extends Model<PlayerAttacks> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Attacks)
    @Column({type: DataType.INTEGER})
    attacksId: number;

    @ForeignKey(() => Player)
    @Column({type: DataType.INTEGER})
    playerId: number;
}
