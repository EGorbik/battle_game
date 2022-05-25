import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Player} from "../player/player.model";
import {PlayerDefences} from "./player-defences.model";

interface DefencesCreationAttrs {
    name: string;
    description: string;
}

@Table({tableName: 'defences'})
export class Defences extends Model<Defences, DefencesCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true,  allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: true,  allowNull: false})
    description: string;

    @BelongsToMany(() => Player, () => PlayerDefences)
    players: Player[];
    actionType: string;
}
