import { IsNotEmpty } from 'class-validator';
// LoginUserDto class that the application uses to verify the user's credentials when they are trying to login.
export class LoginUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}