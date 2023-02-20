import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { environment } from "src/env/env";
import { UserDto } from "src/User/user/dto/user.dto";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./interfaces/payload.interface";
@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        let JWT_SECRET='Black'
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: environment.JWT_SECRET,
        })
    }
    async validate(payload:  JwtPayload):Promise<UserDto> {
        const user = await this.authService.validateUser(payload);
        if(!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}