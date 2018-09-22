import { IsNotEmpty } from 'class-validator';

export default class LoginForm {
    @IsNotEmpty()
    userName: String
    @IsNotEmpty()
    password: String
}