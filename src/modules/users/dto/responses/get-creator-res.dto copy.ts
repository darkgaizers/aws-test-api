import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { User } from '../../user.model';

@Exclude()
export class GetCreatorResDto {

  constructor(creator: User) {
    const creatorDataValues: User = creator['dataValues'];

    Object.assign(this, creatorDataValues);
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
