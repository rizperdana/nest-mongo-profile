import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
}
