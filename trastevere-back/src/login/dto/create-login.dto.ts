import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
} from 'class-validator';
import { any } from 'joi';

export class CreateLoginDto {
  @IsString()
  name;
  @IsString()
  surname;
  @IsString()
  @IsEmail()
  email;
  @IsString()
  password;
  @IsString()
  address;
  @IsString()
  phone;
  @IsDateString()
  bornDate;
  @IsString()
  cif;
}
