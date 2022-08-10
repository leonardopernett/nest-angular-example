import { Injectable } from "@nestjs/common";
import { resolve } from "path";
import { CloudService } from "../cloudinary/cloud.service";
import { DbService } from "../database/db.Service";
import * as fs from 'fs-extra'

@Injectable()
export class BookService {
  

   constructor(
      private db:DbService,
      private cloud:CloudService
      
      ){}


   async createBook(book){
    const { title, author, imageUrl, user_id }= book
    const { public_id, secure_url } = await this.cloud.insertImage(resolve('./public'+imageUrl))
    await this.db.Db('INSERT INTTO books (title, author,imageUrl, public_id, user_id) values (?,?,?,?,?)',[
      title, author,secure_url,public_id, user_id
    ])

    await fs.unlink(resolve('./public'+imageUrl))
    return {
      message:'book created'
    }
   }

}