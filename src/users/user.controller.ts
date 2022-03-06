import { Controller, UseGuards, HttpStatus, Param, Req, Res, Body } from "@nestjs/common";
import { Post, Get, Put, Patch, Delete } from "@nestjs/common";
import { User } from "./user.schema";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

//TODO: Secure password: 1- Encrypt them 
//                       2- Dont return in reponses

@Controller('users')   
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Res() response, @Body() user: User) {
        
        // Verify if the email is already in use.
        if (await this.userService.isDuplicateEmail(user.email)) {
            return response.status(HttpStatus.CONFLICT).json({
                "message":"email alredy exist"
            });
        }

        //TODO: Add message if email is missing, because is required
        const newUser = await this.userService.create(user);
        return response.status(HttpStatus.CREATED).json(newUser)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const users = await this.userService.readAll();
        return response.status(HttpStatus.OK).json(users)
    }

    @UseGuards(JwtAuthGuard)
    @Get('active')
    async fetchActive(@Res() response) {
        const users = await this.userService.readActive();
        return response.status(HttpStatus.OK).json(users)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findById(@Res() response, @Param('id') id) {
        const user = await this.userService.readById(id);
        if (user === null) {
            return response.status(HttpStatus.NOT_FOUND).send()
        }
        return response.status(HttpStatus.OK).json(user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('active/:id')
    async updateUserStatus(@Res() response, @Param('id') id, @Req() req) {
        if (id != req.user.id) {
            return response.status(HttpStatus.FORBIDDEN).send();
        }
        const status = req.body.active;
        const updatedStatus = await this.userService.updateStatus(id, status);
        return response.status(HttpStatus.OK).json(updatedStatus)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Res() response, @Param('id') id, @Req() req) {
        if (id != req.user.id) {
            return response.status(HttpStatus.FORBIDDEN).send();
        }
        const updatedUser = await this.userService.update(id, req.body);
        return response.status(HttpStatus.OK).json(updatedUser)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Res() response, @Param('id') id, @Req() req) {
        if (id != req.user.id) {
            return response.status(HttpStatus.FORBIDDEN).send();
        }
        const deletedUser = await this.userService.delete(id);
        return response.status(HttpStatus.OK).json(deletedUser)
    }
}
