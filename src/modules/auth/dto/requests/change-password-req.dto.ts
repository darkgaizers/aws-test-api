import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ChangePasswordDataReqDto {
  @ApiProperty()
  @Expose()
  public readonly token: string;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly password: string;
}
