import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TokensService } from 'src/tokens/tokens.service';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, PrismaService, TokensService],
})
export class StudentsModule {}
