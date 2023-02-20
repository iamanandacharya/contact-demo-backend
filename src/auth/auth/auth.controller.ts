import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/User/user/dto/user-login.dto';
import { CreateUserDto } from 'src/User/user/dto/user.create.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/regisration-status.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
// The register() route handler is a POST route handler that receives an instance of CreateUserDto object and delegates creating a new user to the AuthService.register() function. Depending on the status of registration, this route handler might either throw a BAD_REQUEST exception or the actual registration status.
    @Post('register')  
    public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {    
    const result: 
    RegistrationStatus = await this.authService.register(createUserDto,);
    if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
    }
    return result;  
   }
   // The login() route handler simply returns the response of the call to AuthService.login() function. Basically, if the user credentials are valid, this route handler returns a signed JWT to the calling app.
   @Post('login')  
   public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);  
   }
}
