import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { getPasswordHash, isMatchPassword } from 'src/libs/hashing';
import { MessageModel } from 'src/libs/message.model';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { GetUser } from 'src/libs/get-user.decorator';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { JwtModel } from './dto/jwt.model';
import { OtpService } from 'src/otp/otp.service';
import { Otp } from 'src/otp/entities/otp.entity';
import { UserAuthService } from './user-auth.service';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { AuthResponseModel } from './dto/auth-response.model';
import { UserAuth } from './entities/user-auth.entity';
import { JwtGuard } from './libs/jwt.guard';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { ProfileService } from 'src/profile/profile.service';

@Controller('v1/user-auth')
export class UserAuthController {
  constructor(
    private jwtTokenService: JwtService,
    private readonly userAuthService: UserAuthService,
    private readonly profileService: ProfileService,
    private readonly otpService: OtpService,
  ) {}

  @Post('sign-up/data')
  async signUpData(@Body() dto: CreateUserAuthDto): Promise<AuthResponseModel> {
    try {
      const passwordHash = await getPasswordHash(dto.password);
      const bodyUser: CreateUserAuthDto = {
        ...dto,
        password: passwordHash,
      };
      const user: UserAuth = await this.userAuthService.create(bodyUser);
      const bodyProfile: CreateProfileDto = {
        ...dto,
        userId: user.id,
      };
      this.profileService.create(bodyProfile);
      const payload: JwtModel = { id: user.id, email: user.email };
      const authRes = this.userAuthService.getJwtSign(
        this.jwtTokenService,
        payload,
      );
      return {
        ...authRes,
        message: 'Sign Up Successfully',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto): Promise<AuthResponseModel> {
    try {
      const user: UserAuth = await this.userAuthService.findOneByEmail(
        dto.email,
      );
      if (!user) {
        throw { message: 'User not found' };
      }
      const isMatch = await isMatchPassword(dto.password, user.password);
      if (!isMatch) {
        throw { message: 'Wrong Password' };
      }
      const payload: JwtModel = { id: user.id, email: user.email };
      const authRes = this.userAuthService.getJwtSign(
        this.jwtTokenService,
        payload,
      );
      return {
        ...authRes,
        message: 'Sign In Successfully',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('sign-in/refresh')
  @UseGuards(JwtGuard)
  async ReSignIn(@GetUser() user: UserAuth): Promise<AuthResponseModel> {
    try {
      const payload: JwtModel = { id: user.id, email: user.email };
      const authRes = this.userAuthService.getJwtSign(
        this.jwtTokenService,
        payload,
      );
      return {
        ...authRes,
        message: 'Refresh Sign In Successfully',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: UpdateUserAuthDto): Promise<MessageModel> {
    try {
      const { codeOtp, password } = dto;
      const userOtp: Otp = await this.otpService.findOneByOtp(codeOtp);
      if (!userOtp) {
        throw 'Otp not found';
      }
      const user: UserAuth = await this.userAuthService.findOneByEmail(
        userOtp.email,
      );
      if (!user) {
        throw 'User not found';
      }
      const passwordHash = await getPasswordHash(password);
      const bodyUser: any = { password: passwordHash };
      await this.userAuthService.update(+user.id, bodyUser);
      await this.otpService.remove(userOtp.id);
      return { message: 'Update Password Successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
