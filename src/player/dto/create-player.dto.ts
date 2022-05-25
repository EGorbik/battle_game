import {IsString, Length} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlayerDto {
    @ApiProperty({example: 'admin', description: 'Player login'})
    @IsString({message: 'Must be a string'})
    readonly login: string;

    @ApiProperty({example: '1234', description: 'Player password'})
    @IsString({message: 'Must be a string'})
    @Length(4, 16, {message: 'Fix length must be'})
    readonly password: string;
}
