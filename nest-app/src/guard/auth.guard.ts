import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { comparePassword } from "../middleware/bcrypt";
import { DbService } from "../database/db.Service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private db:DbService){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    
    let validate = async () => {

       const req = context.switchToHttp().getRequest()

       const { email, password } = req.body

       const [ user ] = await this.db.Db(`SELECT u.id, u.firstname, u.lastname, u.email, u.password, r.rol  FROM users u
       INNER JOIN roles r
       ON r.id= u.roles_id
       WHERE email=?`,[ email ])

       if(!user){
         throw new HttpException("User or password incorrect",401);
       }

       const match = await comparePassword(password, user.password)
       if(!match){
         throw new HttpException("User or password incorrect",401);
       }

        req.user = {
          id:user.id,
          firstname:user.firstname,
          lastname:user.lastname,
          email:user.email,
          rol:user.rol
        }
       return true
     }


     return validate()
  }


}