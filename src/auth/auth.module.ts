import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {PlayerModule} from "../player/player.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => PlayerModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: { expiresIn: '24h' }
        }),
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
