import { IsDateString, IsNumber } from 'class-validator';
export class CreateReservaDto {
  @IsDateString()
  fechaInicio;
  @IsDateString()
  fechaSalida;
  @IsNumber()
  numHuespedes;
}
