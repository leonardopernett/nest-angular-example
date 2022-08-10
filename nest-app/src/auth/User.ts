import { IsEmail, MaxLength, MinLength } from "class-validator";


export class UserDto {

  @MinLength(3)
  @MaxLength(100)
  firstname:string

  @MinLength(3)
  @MaxLength(100)
  lastname:string

  @IsEmail()
  email:string

  @MaxLength(255)
  password:string

}