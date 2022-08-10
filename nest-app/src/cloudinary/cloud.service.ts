import { Injectable } from "@nestjs/common"
import * as cloudinary  from 'cloudinary'

/* CLOUDINARY_CLOUD_NAME=lnarddev
CLOUDINARY_API_KEY=363382297912935
CLOUDINARY_API_SECRET=grGNAE0GK21n5wZQfXsNW136npc
 */
@Injectable()
export class CloudService {

  constructor(){
    this.initConnection()
  }

  initConnection(){
      cloudinary.v2.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET,
        secure:true
      })
    }
  

    async insertImage(image_url){
      return  await cloudinary.v2.uploader.upload(image_url)
    }

    deleteImage(){

    }

}