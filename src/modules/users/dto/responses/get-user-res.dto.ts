import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { User } from '../../user.model';

@Exclude()
export class GetUserResDto {

  constructor(user: Partial<User>) {
    const { ...result } = user['dataValues'];

    Object.assign(this, result);
  }

  @ApiProperty()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly firstName: string;

  @ApiProperty()
  @Expose()
  public readonly lastName: string;
}
