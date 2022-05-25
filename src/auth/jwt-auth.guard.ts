import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "./auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private authService: AuthService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        return this.validateRequest(req);
    }

    async validateRequest(req): Promise<boolean>{
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'admin not authorised'})
            }
            const admin = this.jwtService.verify(token);
            req.admin = admin;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'player not authorised'})
        }
    }
}
