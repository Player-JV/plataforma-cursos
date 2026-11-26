import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotificacoesService } from '../notificacoes/notificacoes.service';
export declare class PagamentosService {
    private prisma;
    private notificacoesService;
    constructor(prisma: PrismaService, notificacoesService: NotificacoesService);
    create(createPagamentoDto: CreatePagamentoDto): Promise<{
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
    }>;
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
