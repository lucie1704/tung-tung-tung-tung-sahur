import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  username: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  password: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  confirmPassword: string;
}
