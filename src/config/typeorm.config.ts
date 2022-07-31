import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig : TypeOrmModuleOptions= {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    password : '1234',
    database : 'taskmanagement',
    //entities : [__dirname + '/../**/**.entity.ts'] ,
    entities : [__dirname + '/../**/**.entity{.ts,.js}'] ,
    synchronize : true,
};