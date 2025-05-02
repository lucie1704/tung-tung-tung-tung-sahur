import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsEmail()
  @Type(() => String)
  email: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  firstName: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  lastName: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  birthDate: string;
}
