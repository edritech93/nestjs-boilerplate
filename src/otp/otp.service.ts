import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}

  create(createOtpDto: CreateOtpDto): Promise<Otp> {
    return this.otpRepository.save(createOtpDto);
  }

  findAllByEmail(email: string): Promise<Otp[]> {
    return this.otpRepository.find({
      where: [{ email }],
    });
  }

  findOneByEmail(email: string): Promise<Otp> {
    return this.otpRepository.findOneBy({ email });
  }

  findOneByOtp(codeOtp: string): Promise<Otp> {
    return this.otpRepository.findOneBy({ codeOtp });
  }

  remove(id: number) {
    return this.otpRepository.delete(+id);
  }
}
