import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty({ example: 'JavaScript do Zero' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Aprenda JS moderno' })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ example: 'Iniciante' })
  @IsString()
  @IsNotEmpty()
  nivel: string;

  @ApiProperty({ example: 25 })
  @IsInt()
  @IsOptional()
  totalAulas?: number;

  @ApiProperty({ example: 40 })
  @IsInt()
  @IsOptional()
  totalHoras?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idInstrutor: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCategoria: number;
}