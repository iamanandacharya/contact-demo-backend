import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { environment } from 'src/env/env';
import { LoginUserDto } from 'src/User/user/dto/user-login.dto';
import { CreateUserDto } from 'src/User/user/dto/user.create.dto';
import { UserDto } from 'src/User/user/dto/user.dto';
import { UserService } from 'src/User/user/user.service';
import {RegistrationStatus} from '../auth/interfaces/regisration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    ) {}
    // This function takes the CreateUserDto as an input parameter and delegates the actual user creation to the UsersService.create() function. It returns a RegistrationStatus to indicate a success or fail user creation.
    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
          };
      
          try {
            await this.usersService.create(userDto);
          } catch (err) {
            status = {
              success: false,
              message: err,
            };
          }
      
          return status;
    }
    // The function receives the LoginUserDto as an input parameter. Internally, it uses the UsersService.findByLogin() function to validate the user credentials.
    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);

        // generate and sign token
        const token = this._createToken(user);
    
        return {
          username: user.username,
          ...token,
        };
    }
    // The function receives the JWT payload as input and it retrieves the user from the database via UsersService.findByPayload() function.
    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;

    }
    private _createToken({username}: UserDto): any {
        const expiresIn = environment.EXPIRESIN;

        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user);
        return {
          expiresIn,
          accessToken,
        };
    }
}
