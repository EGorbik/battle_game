import {IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TurnDto {
    @ApiProperty({example: [1, 2], description: 'player ids'})
    @IsString({message: 'Must be an array of numbers'})
    readonly ids: Array<number>;
}
