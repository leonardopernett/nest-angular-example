import { Body, Controller, Delete, Get, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { BookService } from "./book.service";
import * as multer from 'multer'
import { extname, resolve } from "path";
import { JwtGuard } from "src/guard/jwt.guard";

@Controller('books')
@UseInterceptors(FileInterceptor('imageUrl',{
 storage:multer.diskStorage({
    destination:resolve('./public/uploads'),
    filename:(_, req, cb) => {
      cb(null, Date.now()+extname(req.originalname))
    }
    })
}))
@UseGuards(JwtGuard)
export class BookController {
  
  constructor(private book:BookService){}

    @Get('')
    getAll(){

    } 

    @Get(':id')
    getOne(){

    } 

    @Post('')
    async createOne(
      @Body() body,
      @Req() req,
      @Res() res,
      @UploadedFile() image
    ){
  
      const { title, author } = body
      const { id } = req.user.payload.user
    
      const { filename } = image

      const newBook = {
        title,
        author,
        imageUrl:'/uploads/'+filename,
        user_id:id
      }
      await this.book.createBook(newBook)
      return res.json('ok')
    } 

    @Delete('delete/:id')
    deleteOne(){

    } 

    @Put(':id/edit')
    editOne(){

    } 


}