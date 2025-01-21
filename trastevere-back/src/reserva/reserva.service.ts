import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { PrismaService } from 'src/prisma.service';
import { TarifaService } from 'src/tarifa/tarifa.service';
import * as DayJs from 'dayjs';

@Injectable()
export class ReservaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tarifaService: TarifaService,
  ) {}

  async create(createReservaDto: CreateReservaDto, userId: number) {
    try {
      createReservaDto.fechaInicio = new Date(createReservaDto.fechaInicio);
      createReservaDto.fechaSalida = new Date(createReservaDto.fechaSalida);

      const exitsReserva = await this.exitResevaBetweenDates(
        createReservaDto.fechaInicio,
        createReservaDto.fechaSalida,
      );

      if (exitsReserva) {
        return {
          message: 'Ya existe una reserva en esas fechas',
          status: 400,
        };
      }
      if (createReservaDto.fechaInicio <= new Date()) {
        return {
          message:
            'Todavia no hemos inventado la maquina del tiempo para reservar en el pasado',
          status: 400,
        };
      }

      const datesArray: Date[] = [];
      const dateControl = new Date(createReservaDto.fechaInicio);
      while (dateControl <= createReservaDto.fechaSalida) {
        datesArray.push(new Date(dateControl));
        dateControl.setDate(dateControl.getDate() + 1);
      }
      const tarifasIds = [];
      let totalPrice = await this.getTotalPrice(
        createReservaDto.numHuespedes,
        datesArray,
      );
      for (const element of datesArray) {
        tarifasIds.push(await this.tarifaService.tarifaByDate(element));
      }

      const result = this.prisma.reserva.create({
        data: {
          ...createReservaDto,
          usrId: userId,
          precioFinal: totalPrice,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async getTotalPrice(numHuespedes: number, datesArray: Date[]) {
    const tarifasIds = [];
    let totalPrice = 0;
    for (const element of datesArray) {
      tarifasIds.push(await this.tarifaService.tarifaByDate(element));
    }

    const tarifas = await this.tarifaService.findAll();
    totalPrice = tarifasIds.reduce((acc, tarifa) => {
      const tarifaInt = tarifas.find((t) => t.id === tarifa);
      let price = tarifaInt.price * (numHuespedes * 0.1 + 1);

      price += price * (tarifaInt.iva / 100);
      acc += price;
      return acc;
    }, 0);
    return Math.ceil(totalPrice);
  }

  private async exitResevaBetweenDates(startDate: Date, endDate: Date) {
    const reservas = await this.prisma.reserva.findMany({
      where: {
        fechaInicio: {
          lte: endDate,
        },
        fechaSalida: {
          gte: startDate,
        },
        deleted: false,
      },
    });
    return reservas.length > 0;
  }

  async findAll(userId: number) {
    const reservas = await this.prisma.reserva.findMany({
      where: {
        usrId: userId,
      },
    });
    return reservas;
  }

  async getAllReservas() {
    return this.prisma.reserva.findMany({
      include: {
        usuario: {
          select: {
            email: true,
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async allReservesDates() {
    const reservas = await this.prisma.reserva.findMany({
      select: {
        fechaInicio: true,
        fechaSalida: true,
      },
      where: {
        AND: {
          fechaSalida: {
            gte: new Date(),
          },
          deleted: false,
        },
      },
    });

    let dates = new Set();

    reservas.forEach((reserva) => {
      const dateControl = new Date(reserva.fechaInicio);
      while (dateControl <= reserva.fechaSalida) {
        dates.add(new Date(dateControl));
        dateControl.setDate(dateControl.getDate() + 1);
      }
    });
    return [...dates].reduce((acc, cur: Date) => {
      acc[`${cur.getFullYear()}-${cur.getMonth() + 1}-${cur.getDate()}`] = true;
      return acc;
    }, {});
  }

  async remove(id: number, userId: number) {
    const reserva = await this.prisma.reserva.findUnique({
      where: {
        id: id,
        usrId: userId,
        fechaInicio: {
          gt: DayJs().add(3, 'day').toDate(),
        },
      },
    });

    if (!reserva) {
      throw {
        message: 'No se encontro la reserva',
        status: 404,
      };
    }
    return this.prisma.reserva.update({
      where: {
        id: id,
        usrId: userId,
      },
      data: {
        devolucion: true,
      },
    });
  }
  async removeAdmin(id: number) {
    const reserva = await this.prisma.reserva.findUnique({
      where: {
        id: id,
        // usrId: userId,
        // fechaInicio: {
        //   gt: DayJs().add(3, 'day').toDate(),
        // },
      },
    });

    if (!reserva) {
      throw {
        message: 'No se encontro la reserva',
        status: 404,
      };
    }
    return this.prisma.reserva.update({
      where: {
        id: id,
        // usrId: userId,
      },
      data: {
        deleted: true,
      },
    });
  }
}
