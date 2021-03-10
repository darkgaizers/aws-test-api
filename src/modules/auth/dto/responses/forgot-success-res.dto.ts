import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { PASSWORD_RESET_REQUESTED } from 'src/constants';

@Exclude()
export class ForgotSuccessResDto {
  constructor(forgetSuccessRes: ForgotSuccessResDto) {
    this.token = forgetSuccessRes.token;
  }

  @ApiProperty()
  @Expose()
  public readonly message?: string = PASSWORD_RESET_REQUESTED;

  @ApiProperty()
  @Expose()
  public readonly token: string;
}
