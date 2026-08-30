import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAulaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tipoConteudo: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  urlConteudo?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  duracaoMinutos?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  ordem: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idModulo: number;
}