import {Body, Controller, Get, Post, Req, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {PlayerService} from "../player/player.service";
import {CreatePlayerDto} from "../player/dto/create-player.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { responseAuthDto } from "./dto/response-auth.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
                private playerService: PlayerService) {}

    @ApiOperation({summary: 'Registration player'})
    @UsePipes(ValidationPipe)
    @ApiResponse({status: 201, type: responseAuthDto, description: 'The user has been successfully sign up.'})
    @Post('/registration')
    registration(@Body() playerDto: CreatePlayerDto) {
        return this.authService.registration(playerDto)
    }

    @ApiOperation({summary: 'Login player'})
    @Post('/login')
    login(@Body() playerDto: CreatePlayerDto) {
        return this.authService.login(playerDto);
    }

    @ApiOperation({summary: 'Get player data by access token'})
    @Get('/me')
    @UseGuards(JwtAuthGuard)
    public async getPlayer (@Req() request) {
        return this.playerService.getPlayerById(request.player.id);
    }

    @ApiOperation({summary: 'Create new token pair'})
    @Post('/generateNewTokens')
    createNewTokens(@Body() tokensDto) {
        return this.authService.createNewTokens(tokensDto.accessToken, tokensDto.refreshToken);
    }
}
