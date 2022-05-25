import {Column, DataType, HasMany, Model, Table, BelongsToMany, ForeignKey} from "sequelize-typescript";
import {Player} from "../player/player.model";
import {Defences} from "./defences.model";

@Table({tableName: 'player_defences', createdAt: false, updatedAt: false})
export class PlayerDefences extends Model<PlayerDefences> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Defences)
    @Column({type: DataType.INTEGER})
    defencesId: number;

    @ForeignKey(() => Player)
    @Column({type: DataType.INTEGER})
    playerId: number;
}
