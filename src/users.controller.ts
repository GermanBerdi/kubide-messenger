import { Controller, Get, Post, Put } from '@nestjs/common';

/*enum statusType {
    online,
    offline,
    away,
    busy
}*/

type User = {
      userId   : number;          //Id del usuario. Unico para cada usuario
      name     : string;          //Nombre del usuario.
      lastName : string;          //Apellido del usuario.
      email    : string;          //Email del usuario. Lo usara de login. Unico para cada usuario
//    password : string;          //Password del usuario.
//    active   : boolean;         //Define si el usuario esta activo o no.
//    status   : statusType;      //Estado del usuario puede ser (online, offline, away, busy)
}

@Controller('users')
export class UsersController {

    //Devolver la lista de usuarios
    @Get()
    listUsers(): User[] {
        
        let user:User;
        let users:User[];

        //dejo el array vacio para poder usar el metodo push
        users = [];

        user = {
            userId   : 1,
            name     : "German",
            lastName : "Berdichevsky",
            email    : "german.metha@gmail.com"
        }
        users.push(user);
      
        user = {
            userId   : 2,
            name     : "Leonel",
            lastName : "Berdichevsky",
            email    : "leonel.metha@gmail.com"
        }
        users.push(user);

        user = {
            userId   : 3,
            name     : "Juan Carlos",
            lastName : "Berdichevsky",
            email    : "juanpi.metha@gmail.com"
        }
        users.push(user);
        
        return users;
    }

    @Post()
    createUser(): string {
        return 'Tras verificar el email del usuario no existe, esto crea un usuario';
    }

    @Get('login')
    loginUser(): string {
        return 'Aqui se loguea el usuario y obtiene su token';
    }

    @Put()
    editUser(): string {
        return 'Esto edita un usuario';
    }

    @Get('profile')
    queryUser(): string {
        return 'Aqui consulto los datos del usuario "userId"';
    }

    @Get('active')
    listActiveUsers(): string {
        return 'Esto devuelve la lista de usuarios activos';
    }
}