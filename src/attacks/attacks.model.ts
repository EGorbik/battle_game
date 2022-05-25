import {Column, DataType, HasMany, Model, Table, BelongsToMany} from "sequelize-typescript";
import {Player} from "../player/player.model";
import {PlayerAttacks} from "./player-attacks.model";

interface AttacksCreationAttrs {
    name: string;
    description: string;
}

@Table({tableName: 'attacks'})
export class Attacks extends Model<Attacks, AttacksCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true,  allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: true,  allowNull: false})
    description: string;

    @BelongsToMany(() => Player, () => PlayerAttacks)
    players: Player[];
    actionType: string;
}
