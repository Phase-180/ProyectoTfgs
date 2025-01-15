import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TarifaModule } from 'src/tarifa/tarifa.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [TarifaModule],
  controllers: [ReservaController],
  providers: [ReservaService, PrismaService],
})
export class ReservaModule {}
