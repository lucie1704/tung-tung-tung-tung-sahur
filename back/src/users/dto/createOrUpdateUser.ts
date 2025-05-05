import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateOrUpdateUserDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  username: string;
}
