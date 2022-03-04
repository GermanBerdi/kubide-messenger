import { Controller, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';

//creo una constante userModel para poder acceder a mongoDb
const userModel = require('./users.model');

/*type User = {
      userId   : number;          //Id del usuario. Unico para cada usuario
      name     : string;          //Nombre del usuario.
      lastName : string;          //Apellido del usuario.
      email    : string;          //Email del usuario. Lo usara de login. Unico para cada usuario
//    password : string;          //Password del usuario.
//    active   : boolean;         //Define si el usuario esta activo o no.
//    status   : statusType;      //Estado del usuario puede ser (online, offline, away, busy)
}*/

@Controller('users')
export class UsersController {

    //Devolver la lista de usuarios
    @Get()
    async listUsers(): Promise<any> {

        const usersList = await userModel.find({});

        return await usersList;
    }

    //Crear usuario
    @Post()
    async createUser(@Req() request: Request): Promise<any> {
    
        //Guardo en una constante los datos del usuario a crear recibidos en el request
        const newUser = request.body;

        //Guardo en una constante el resultado de haber insertado un usuario en la BBDD
        const createdUser = await userModel.create(newUser);

        return createdUser;
    }

    @Get('login')
    loginUser(): string {
        return 'Aqui se loguea el usuario y obtiene su token';
    }

    @Put()
    editUser(): string {
        return 'Esto edita un usuario';
    }

    //Consultar datos de un Usuario
    @Get('profile')
    queryUser(): string {
        return 'Aqui consulto los datos del usuario "userId"';
    }

    @Get('active')
    listActiveUsers(): string {
        return 'Esto devuelve la lista de usuarios activos';
    }
}