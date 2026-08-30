import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
export declare class PagamentosController {
    private readonly pagamentosService;
    constructor(pagamentosService: PagamentosService);
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PagamentoClient<({
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
    update(id: string, updatePagamentoDto: UpdatePagamentoDto): import(".prisma/client").Prisma.Prisma__PagamentoClient<{
        id: number;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        metodoPagamento: string;
        idTransacaoGateway: string;
        idAssinatura: number;
        dataPagamento: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__PagamentoClient<{
        id: number;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        metodoPagamento: string;
        idTransacaoGateway: string;
        idAssinatura: number;
        dataPagamento: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
