import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseModel {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  expiresIn: number | string;

  @ApiProperty()
  message?: string;
}
