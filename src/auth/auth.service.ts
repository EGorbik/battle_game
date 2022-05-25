import {HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {PlayerService} from "../player/player.service";
import {CreatePlayerDto} from "../player/dto/create-player.dto";
import {Player} from "../player/player.model";

@Injectable()
export class AuthService {
    constructor(private playerService: PlayerService,
                private jwtService: JwtService) {
    }

    async login(playerDto) {
        const player = await this.validateUser(playerDto);
        const accessToken = await this.generateAccessToken(player);
        const refreshToken = await this.generateRefreshToken(player);
        return {
            id: player.id,
            email: player.login,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: 10
        }
    }

    async createNewTokens(accessToken: string, refreshToken: string) {
        try {
            const player = await this.jwtService.verify(refreshToken);
            const newAccessToken = await this.generateAccessToken(player);
            const newRefreshToken = await this.generateRefreshToken(player);
            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        } catch (e) {
            switch (e.message) {
                case 'invalid signature':
                    throw new UnauthorizedException({message: 'Wrong refresh token'})
                case 'jwt expired':
                    throw new UnauthorizedException({message: 'Refresh token expired'})
            }

        }
    }

    async registration(playerDto: CreatePlayerDto) {
        const candidate = await this.playerService.getPlayerByLogin(playerDto.login);
        if(candidate) {
            throw new HttpException('User with this login already exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(playerDto.password, 5);
        const player = await this.playerService.createPlayer({...playerDto, password: hashPassword})
        const accessToken = await this.generateAccessToken(player);
        const refreshToken = await this.generateRefreshToken(player);
        return {
            id: player.id,
            email: player.login,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: 60
        }
    }

    private async generateAccessToken(user: Player) {
        const payload = {email: user.login, id: user.id}
        return this.jwtService.sign(payload, {expiresIn: '10h'})
    }

    private async generateRefreshToken(user: Player) {
        const payload = {email: user.login, id: user.id}
        return this.jwtService.sign(payload)
    }

    private async validateUser(playerDto: CreatePlayerDto) {
        const player = await this.playerService.getPlayerByLogin(playerDto.login);
        if(!player) {
            throw new UnauthorizedException({message: 'Player with this login is not exist'})
        }
        const passwordEquals = await bcrypt.compare(playerDto.password, player.password);
        if(player && passwordEquals) {
            return player;
        }
        throw new UnauthorizedException({message: 'Wrong password'})
    }
}
