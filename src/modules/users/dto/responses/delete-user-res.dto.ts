import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DeleteUserResDto {

  @ApiProperty()
  @Expose()
  public readonly success: boolean = true;
}
