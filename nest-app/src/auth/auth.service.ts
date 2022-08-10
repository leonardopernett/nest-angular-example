import { Injectable, UsePipes, ValidationPipe } from "@nestjs/common";
import { encryptPassword } from "../middleware/bcrypt";
import { DbService } from "../database/db.Service";

@Injectable()

export class AuthService {
  
   constructor(
      private dbService:DbService
      ){}

   async signup(data){
     const { firstname, lastname, email, password } = data
     const newPassword = await encryptPassword(password)
     await this.dbService.Db('INSERT INTO users (firstname, lastname, email, password, roles_id) values (?,?,?,?,?)',[
      firstname, lastname, email, newPassword, 2
     ])
     return {
       message:'User was registered'
     }
 
   }

   
}