import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { LoginDto, RegisterDto, ProfileDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
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

  async registerUser(registerDto: RegisterDto) {
    const { email } = registerDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('Email already used', HttpStatus.CONFLICT);
    }

    const newUser = new this.userModel(registerDto);
    await newUser.save();

    return {
      success: true,
      email,
    };
  }

  async createProfile(profileDto: ProfileDto, userId: string, image: Express.Multer.File) {
    const user = await this.userModel.findById({ _id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

  }
}
