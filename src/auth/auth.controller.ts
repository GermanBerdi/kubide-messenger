import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  // The @UseGuards(LocalAuthGuard) calls local-auth.guard sets the AuthGuard to local
  // to use the local.strategy and calls the validate function.
  // This function user authservice.validateuser that verify username/password
  // and if ok it inserts user's data in the request. Once this is done
  // login calls authService.login to obtain the token.
  // Inside authService.login, the jwtService.sign function overwrites the req.user
  // information with the data defined in the payload
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async myInfo(@Request() req) {
    return req.user;
  }
}