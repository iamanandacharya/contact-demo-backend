import { UserDto } from "src/User/user/dto/user.dto";
import { User } from "src/User/user/user.entity";

export const toUserDto = (data: User): UserDto => {
    const { id, username, email } = data;
  
    let userDto: UserDto = {
      id,
      username,
      email,
    };
  
    return userDto;
  };