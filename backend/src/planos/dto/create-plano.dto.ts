import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePlanoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  duracaoMeses: number;
}