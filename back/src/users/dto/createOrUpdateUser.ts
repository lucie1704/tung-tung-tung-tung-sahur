import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class CreateOrUpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Type(() => String)
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Type(() => String)
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Type(() => String)
  theme?: string;
}
