import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  forgetPassworDto,
  loginUserDto,
  UpdateUserDTO,
} from './dto/Dto';
import { UserEntity } from './entities/user.entity';
import { mobileNumberValidator } from 'src/validators/validators';
import * as bcrypt from 'bcryptjs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { sendMail } from 'src/utils/sendMail';
import { expireTime, generateOtpCode } from 'src/utils/utils';
import { OTP } from './entities/otp.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async create(createUser: CreateUserDto) {
    if (!mobileNumberValidator(createUser.phone)) {
      throw new BadRequestException('Invalid Phone Number');
    }

    const userExist = await UserEntity.findOne({
      where: { email: createUser.email },
    });

    if (userExist) {
      throw new HttpException('Email already exist', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createUser.password, salt);

    let user = await UserEntity.create({
      name: createUser.name,
      email: createUser.email,
      address: createUser.address,
      phone: createUser.phone,
      password: hashPassword,
    }).save();

    delete user.password;

    return user;
  }

  async login(loginUserDto: loginUserDto) {
    const userExist = await UserEntity.findOne({
      where: { email: loginUserDto.email },
    });

    if (!userExist) {
      throw new HttpException("User doesn't already exist", 400);
    }

    const isPassword = await bcrypt.compare(
      loginUserDto.password,
      userExist.password,
    );

    if (!isPassword) {
      throw new HttpException('Invalid Email or Password', 400);
    }

    const token = this.jwtService.sign({
      id: userExist.id,
    });
    return token;
  }

  async forgetPassword(forgetpasswordDto: forgetPassworDto) {
    const { email } = forgetpasswordDto;

    const user = await UserEntity.findOneBy({ email });

    if (!user) {
      throw new HttpException('User doesnot exist', 400);
    }

    const otpCode = generateOtpCode();
    const expire = expireTime();

    await sendMail({
      email: user.email,
      subject: 'Reset Password Otp',
      message: `Hello ${user.name}, Here is the otp: ${otpCode}`,
    });

    await OTP.create({
      otpCode: otpCode,
      expiresAt: expire,
      user: { id: user?.id },
    }).save();
    return {
      message: 'Otp Sent to registered email',
      data: null,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDTO) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
