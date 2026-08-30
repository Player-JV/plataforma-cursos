import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateModuloDto {
  @ApiProperty({ example: 'Módulo 1 - Fundamentos' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  ordem: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCurso: number;
}