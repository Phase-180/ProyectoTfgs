import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TarifaService } from './tarifa.service';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolGuard } from 'src/guards/rol/rol.guard';

@Controller('tarifa')

export class TarifaController {
  constructor(private readonly tarifaService: TarifaService) {}

  @UseGuards(AuthGuard, RolGuard)
  @Post()
  create(@Body() createTarifaDto: CreateTarifaDto) {
    return this.tarifaService.create(createTarifaDto);
  }

  @Get('allTarifas')
  findAll() {
    return this.tarifaService.findAll();
  }
  @UseGuards(AuthGuard, RolGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarifaDto: UpdateTarifaDto) {
    return this.tarifaService.update(+id, updateTarifaDto);
  }
  @UseGuards(AuthGuard, RolGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarifaService.remove(+id);
  }
}
