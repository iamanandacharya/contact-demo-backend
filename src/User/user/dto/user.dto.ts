import { IsNotEmpty, IsEmail } from 'class-validator';
// UserDto is used when you want to return the User information. Notice how the password field is omitted from this class because you don't ever want to return the user's stored password.
export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  createdOn?: Date;
}