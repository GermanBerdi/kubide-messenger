import { Controller, Get, Post, Put, Param, Body} from '@nestjs/common';

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
        return usersList;
    }

    //Crear usuario
    @Post()
    async createUser(@Body() body: Body): Promise<any> {
        const newUser = body;
        const createdUser = await userModel.create(newUser);
        return createdUser;
    }

    //Loguear usuario y obtener token
    @Get('login')
    loginUser(): string {
        return 'Aqui se loguea el usuario y obtiene su token';
    }

    //Editar datos del usuario
    @Put('profile/:id')
    async editUser(@Param() params:any,@Body() body: Body): Promise<any> {
        const usersData = await userModel.findOneAndUpdate({_id: params.id},body);
        return usersData;
    }

    //Consultar datos de un Usuario
    @Get('profile/:id')
    async queryUser(@Param() params:any): Promise<any> {
        const usersData = await userModel.findById(params.id);
        return usersData;
    }

    //Devuelve la lista de usuarios activos
    @Get('active')
    async listActiveUsers(): Promise<any> {
        const usersActiveList = await userModel.find({active: true});
        return usersActiveList;
    }
}