import { Module } from "@nestjs/common";
import { DbService } from "../database/db.Service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports:[],
  controllers:[AuthController],
  providers:[AuthService, DbService]
})
export class AuthModule {}