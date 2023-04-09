import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { LoginDto, RegisterDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.model.findOne({ email });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = { username: user.username, sub: user._id };
      return {
        success: true,
        email: user.email,
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
  }

  async register(registerDto: RegisterDto) {
    const { email } = registerDto;
    const user = await this.model.findOne({ email });
    if (user) {
      throw new HttpException('Email already used', HttpStatus.CONFLICT);
    }

    const newUser = new this.model(registerDto);
    await newUser.save();

    return {
      success: true,
      email,
    };
  }
}
