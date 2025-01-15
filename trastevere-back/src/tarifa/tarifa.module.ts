import { Module } from '@nestjs/common';
import { TarifaService } from './tarifa.service';
import { TarifaController } from './tarifa.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TarifaController],
  providers: [TarifaService, PrismaService],
  exports: [TarifaService],
})
export class TarifaModule {}
