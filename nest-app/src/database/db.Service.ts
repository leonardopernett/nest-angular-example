import { Injectable } from "@nestjs/common";
import * as mysql from 'mysql2/promise'

@Injectable()
export class DbService {

    private pool = mysql.createPool({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE,
        connectionLimit:10
    })

    Db = async (sql:string, value?:any):Promise<any> => {
       const [row] = await this.pool.query(sql, value)
       return row
    }

}