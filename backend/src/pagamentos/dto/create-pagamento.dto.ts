import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePagamentoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  valorPago: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  metodoPagamento: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idTransacaoGateway: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idAssinatura: number;
}