import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";
import {Column, DataType} from "sequelize-typescript";

export class responseAuthDto {
    @ApiProperty({example: '1', description: 'Unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'test@gmail.com', description: 'Player login'})
    @IsString({message: 'Must be a string'})
    readonly login: string;

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTYxOTg5NDIzMSwiZXhwIjoxNjE5OTgwNjMxfQ.G2TM8GGiANiL57gnUtFDD2-om1N-TEyk_3dHeeKGvaI', description: 'Auth access token'})
    @IsString({message: 'Must be a string'})
    readonly accessToken: string;

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTYxOTg5NDIzMSwiZXhwIjoxNjE5OTgwNjMxfQ.G2TM8GGiANiL57gnUtFDD2-om1N-TEyk_3dHeeKGvaI', description: 'Auth refresh token'})
    @IsString({message: 'Must be a string'})
    readonly refreshTokenToken: string;
}
