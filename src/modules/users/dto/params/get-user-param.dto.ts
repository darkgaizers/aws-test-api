import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Expose, Transform, TransformFnParams } from 'class-transformer';

export class GetUserParamDto {

  @ApiProperty()
  @Expose()
  @IsNumber()
  @Transform(({ value }: TransformFnParams): number => parseInt(value))
  public readonly id: number;
}
