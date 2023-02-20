import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {UserModule} from '../../User/user/user.module'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStratergy } from './jwt.strategy';
import { environment } from 'src/env/env';
@Module({
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        JwtModule.register({
            secret: environment.JWT_SECRET,
            signOptions: {
                expiresIn: environment.EXPIRESIN
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStratergy],
    exports: [PassportModule, JwtModule],
    
})
export class AuthModule {}
