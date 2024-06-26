import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from 'src/shared/mapper';
import { comparePasswords } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/user-login.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
      ) {}
    
      async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepo.findOne(options);
        return toUserDto(user);
      }
    
      async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { username } });
    
        if (!user) {
          throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
    
        // compare passwords
        const areEqual = await comparePasswords(user.password, password);
    
        if (!areEqual) {
          throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    
        return toUserDto(user);
      }
    
      async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({ where: { username } });
      }
    
      async create(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password, email } = userDto;
    
        // check if the user exists in the db
        const userInDb = await this.userRepo.findOne({ where: { username } });
        if (userInDb) {
          throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
    
        const user: User = await this.userRepo.create({
          username,
          password,
          email,
        });
    
        await this.userRepo.save(user);
    
        return toUserDto(user);
      }
    
      private _sanitizeUser(user: User) {
        delete user.password;
        return user;
      }
}
