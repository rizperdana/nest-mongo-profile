import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto, ProfileDto } from './user.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.loginUser(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.registerUser(registerDto);
  }

  @UseGuards(AuthGuard)
  @Post('/createProfile')
  @UseInterceptors(FileInterceptor('image'))
  async createProfile(
    @Body() profileDto: ProfileDto,
    @Request() req,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.userService.createProfile(profileDto, req.user.sub, image);
  }

  @UseGuards(AuthGuard)
  @Get('/getProfile')
  async getProfile(@Request() req) {
    return this.userService.getProfileByUserId(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Put('/updateProfile')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfile(
    @Body() profileDto: ProfileDto,
    @Request() req,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.userService.updateProfile(profileDto, req.user.sub, image);
  }
}
