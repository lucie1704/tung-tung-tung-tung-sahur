import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  username: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  password: string;
}
