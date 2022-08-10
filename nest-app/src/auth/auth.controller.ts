import { Body, Controller, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "../guard/auth.guard";
import { generarToken } from "../middleware/jwt";
import { AuthService } from "./auth.service";
import { UserDto } from "./User";

@Controller('')
@UsePipes(new ValidationPipe())
export class AuthController {

  constructor(
    private auth:AuthService
  ){}

  @UseGuards(AuthGuard)
  @Post('signin')
  login(
    @Res() res,
    @Req() req
  ){
    const token = generarToken(req.user)
    return res.json({ token })
  }

  @Post('signup')
  async register(
    @Body() body:UserDto,
    @Res() res

  ){
    const response = await this.auth.signup(body)
    return res.json(response)
  }

}