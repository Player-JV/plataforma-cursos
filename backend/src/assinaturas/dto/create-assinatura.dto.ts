import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAssinaturaDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idUsuario: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idPlano: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  dataFim: string | Date;
}