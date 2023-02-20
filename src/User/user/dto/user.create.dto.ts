import { IsNotEmpty, IsEmail } from "class-validator";
// CreateUserDto class is used to pass the information provided by the user upon registering a new account.
export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}