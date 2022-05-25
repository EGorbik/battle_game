import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {CreatePlayerDto} from "./dto/create-player.dto";
import {PlayerService} from "./player.service";
import {TurnDto} from "./dto/turn.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Player')
@Controller('player')
export class PlayerController {
    constructor(private playerService: PlayerService) {}

    @ApiOperation({summary: 'Create player'})
    @ApiResponse({status: 200})
    @Post()
    create(@Body() playerDto: CreatePlayerDto) {
        return this.playerService.createPlayer(playerDto)
    }

    @ApiOperation({summary: 'Game turn'})
    @ApiResponse({status: 201, description: 'Success turn of game'})
    @Put('/gameTurn')
    gameTurn(@Body() turnDto: TurnDto) {
        return this.playerService.gameTurn(turnDto);
    }

    @ApiOperation({summary: 'Get player by id'})
    @ApiResponse({status: 200})
    @ApiParam({
        name: 'id',
        description: 'Player id',
    })
    @Get('/:id')
    getById(@Param('id') id) {
        return this.playerService.getPlayerById(id);
    }
}
