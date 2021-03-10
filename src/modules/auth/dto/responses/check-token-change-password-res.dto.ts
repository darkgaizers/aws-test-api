import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class CheckChangePasswordTokenResDto {
  constructor(checkToken: boolean, token: string, email: string) {
    this.canChangePassword = checkToken;
    this.token = token;
    this.email = email;
  }

  @ApiProperty()
  @Expose()
  public readonly canChangePassword: boolean;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly token: string;
}
