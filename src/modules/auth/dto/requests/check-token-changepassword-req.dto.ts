import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CheckTokenChangePasswordDataReqDto {
  @ApiProperty()
  @Expose()
  public readonly token: string;
}
