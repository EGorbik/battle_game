import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Attacks} from "../attacks/attacks.model";
import {PlayerAttacks} from "../attacks/player-attacks.model";
import {Defences} from "../defences/defences.model";
import {PlayerDefences} from "../defences/player-defences.model";

interface PlayerCreationAttrs {
    login: string;
    password: string;
}

@Table({tableName: 'player'})
export class Player extends Model<Player, PlayerCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true,  allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    strength: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    constitution: number;

    @Column({type: DataType.FLOAT, allowNull: false})
    damage: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    orderSkills: number;

    @Column({type: DataType.FLOAT, allowNull: false})
    health: number;

    @BelongsToMany(() => Attacks, () => PlayerAttacks)
    attacks: Attacks[];

    @BelongsToMany(() => Defences, () => PlayerDefences)
    defences: Defences[];
}
