import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';
import { PrismaService } from 'src/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class TarifaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTarifaDto: CreateTarifaDto) {
    return await this.prisma.tarifa.create({ data: createTarifaDto });
  }

  async findAll() {
    return (
      await this.prisma.tarifa.findMany({
        include: { TarifaDays: true },
      })
    ).map((tarifa) => {
      return {
        ...tarifa,
        TarifaDays: tarifa.TarifaDays.map((day) => {
          return {
            dayInit: dayjs(`${day.monthInit}-${day.dayInit}-${dayjs().year()}`),
            dayEnd: dayjs(`${day.monthEnd}-${day.dayEnd}-${dayjs().year()}`),
          };
        }),
      };
    });
  }

  async tarifaByDate(date: Date) {
    const data = await this.prisma.tarifaDays.findFirst({
      select: { trfId: true },
      where: {
        AND: [
          {
            AND: [
              { dayInit: { lte: date.getDate() } },
              { monthInit: { lte: date.getMonth() + 1 } },
            ],
          },
          {
            AND: [
              { dayEnd: { gte: date.getDate() } },
              { monthEnd: { gte: date.getMonth() + 1 } },
            ],
          },
        ],
      },
    });
    return !data ? 0 : data.trfId;
  }

  async findOneById(id: number) {
    const tarifa = await this.prisma.tarifa.findUnique({
      where: {
        id: id,
      },
    });

    if (!tarifa)
      throw new NotFoundException('No se encontró la tarifa solicitada');

    return tarifa;
  }

  async update(id: number, updateTarifaDto: UpdateTarifaDto) {
    return await this.prisma.tarifa.update({
      where: { id: id },
      data: updateTarifaDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.tarifa.delete({
      where: { id: id },
    });
  }
}
