import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    listUsers(): string {
        return 'Esto devuelve la lista de usuarios';
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