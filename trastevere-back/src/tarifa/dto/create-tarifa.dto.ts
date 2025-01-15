import { IsEmail, IsNumber, IsString } from 'class-validator';
export class CreateTarifaDto {
  @IsNumber()
  iva: number;
  @IsString()
  descripcion: string;
  @IsNumber()
  price: number;
}
