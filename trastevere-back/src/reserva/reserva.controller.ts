import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Erequest } from 'src/core/enums/Erequest';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { ReservaService } from './reserva.service';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @UseGuards(AuthGuard, AuthGuard)
  @Post()
  create(@Body() createReservaDto: CreateReservaDto, @Req() req: Request) {
    return this.reservaService.create(createReservaDto, req[Erequest.USER_ID]);
  }

  @Get('allReservesDates')
  findAllreservedDates() {
    return this.reservaService.allReservesDates();
  }

  @UseGuards(AuthGuard, AuthGuard)
  @Get('allReservas')
  allReservas() {
    return this.reservaService.getAllReservas();
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    return this.reservaService.findAll(req[Erequest.USER_ID]);
  }
  @UseGuards(AuthGuard)
  @Post('price/:huespedes')
  async getPrice(
    @Param('huespedes', ParseIntPipe) huespedes: number,
    @Body()
    dates: {
      fechaInicio: string;
      fechaSalida: string;
    },
  ) {
    const datesInt = {
      fechaInicio: new Date(dates.fechaInicio),
      fechaSalida: new Date(dates.fechaSalida),
    };

    const datesArray: Date[] = [];
    const dateControl = new Date(datesInt.fechaInicio);
    while (dateControl <= datesInt.fechaSalida) {
      datesArray.push(new Date(dateControl));
      dateControl.setDate(dateControl.getDate() + 1);
    }
    return await this.reservaService.getTotalPrice(huespedes, datesArray);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const data = await this.reservaService.remove(+id, req[Erequest.USER_ID]);
      res.json(data);
    } catch (error) {
      res.status(error.status).json(error);
    }
  }
  @UseGuards(AuthGuard)
  @Delete('admin/:id')
  async removeAdmin(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const data = await this.reservaService.removeAdmin(+id);
      res.json(data);
    } catch (error) {
      res.status(error.status).json(error);
    }
  }
}
