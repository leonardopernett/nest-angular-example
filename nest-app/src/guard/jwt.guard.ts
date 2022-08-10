import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { verifyToken } from "../middleware/jwt";


@Injectable()
export class JwtGuard implements CanActivate{
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
     
    const req = context.switchToHttp().getRequest()
    
    if(!req.headers['authorization']){
      throw new HttpException("Unathorization",401);
    }
    if(! req.headers['authorization'].startsWith('Bearer ')){
      throw new HttpException("Unathorization",401);
    }

    const token = req.headers['authorization'].split(" ")[1]
    
    if(!token){
      throw new HttpException("Unathorization",401);
    }

    const payload:any= verifyToken(token)
    
    if(!payload){
      throw new HttpException("Unathorization",401);
    }
 
    req.user = {
      payload
    }
    return true
  }

}