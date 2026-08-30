import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateMatriculaDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idUsuario: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idCurso: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dataConclusao?: string | Date;
}