import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ForgotPasswordDataReqDto {
  @ApiProperty()
  @Expose()
  public readonly email: string;
}
