import { Module } from "@nestjs/common";
import { CloudService } from "../cloudinary/cloud.service";
import { DbService } from "../database/db.Service";
import { BookController } from "./book.contrller";
import { BookService } from "./book.service";


@Module({
  imports:[],
  controllers:[BookController],
  providers:[DbService, BookService, CloudService]
})
export class BookModule{}