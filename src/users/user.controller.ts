import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { User } from "./user.schema";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

//TODO: Secure password: 1- Encrypt them 
//                       2- Dont return in reponses

//TODO: Control Errors. Return 404 when User not found

@UseGuards(JwtAuthGuard)
@Controller('users')   
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Res() response, @Body() user: User) {
        
        if (await this.userService.isDuplicateEmail(user.email)) {
            return response.status(HttpStatus.CONFLICT).json({
                "message":"email alredy exist"
            });
        }

        const newUser = await this.userService.create(user);
        return response.status(HttpStatus.CREATED).json(newUser)
    }

    @Get()
    async fetchAll(@Res() response) {
        const users = await this.userService.readAll();
        return response.status(HttpStatus.OK).json(users)
    }

    @Get('active')
    async fetchActive(@Res() response) {
        const users = await this.userService.readActive();
        return response.status(HttpStatus.OK).json(users)
    }

    @Get(':id')
    async findById(@Res() response, @Param('id') id) {
        const user = await this.userService.readById(id);
        if (user === null) {
            return response.status(HttpStatus.NOT_FOUND).send()
        }
        return response.status(HttpStatus.OK).json(user)
    }

    //TODO: This could be done with @Patch
    @Put('active/:id')
    async updateUserStatus(@Res() response, @Param('id') id, @Body() user: User) {
        const status = user.active;
        const updatedStatus = await this.userService.updateStatus(id, status);
        return response.status(HttpStatus.OK).json(updatedStatus)
    }

    @Put(':id')
    async update(@Res() response, @Param('id') id, @Body() user: User) {
        const updatedUser = await this.userService.update(id, user);
        return response.status(HttpStatus.OK).json(updatedUser)
    }

    @Delete(':id')
    async delete(@Res() response, @Param('id') id) {
        const deletedUser = await this.userService.delete(id);
        return response.status(HttpStatus.OK).json(deletedUser)
    }
}
