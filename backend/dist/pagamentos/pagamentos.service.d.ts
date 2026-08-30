import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PagamentosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPagamentoDto: CreatePagamentoDto): import(".prisma/client").Prisma.Prisma__PagamentoClient<{
        id: number;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        metodoPagamento: string;
        idTransacaoGateway: string;
        idAssinatura: number;
        dataPagamento: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        assinatura: {
            id: number;
            idUsuario: number;
            idPlano: number;
            dataFim: Date;
            dataInicio: Date;
        };
    } & {
        id: number;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        metodoPagamento: string;
        idTransacaoGateway: string;
        idAssinatura: number;
        dataPagamento: Date;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__PagamentoClient<({
        assinatura: {
            id: number;
            idUsuario: number;
            idPlano: number;
            dataFim: Date;
            dataInicio: Date;
        };
    } & {
        id: number;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        metodoPagamento: string;
        idTransacaoGateway: string;
        idAssinatura: number;
        dataPagamento: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updatePagamentoDto: UpdatePagamentoDto): import(".prisma/client").Prisma.Prisma__PagamentoClient<{
        id: number;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        metodoPagamento: string;
        idTransacaoGateway: string;
        idAssinatura: number;
        dataPagamento: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__PagamentoClient<{
        id: number;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        metodoPagamento: string;
        idTransacaoGateway: string;
        idAssinatura: number;
        dataPagamento: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
