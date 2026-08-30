import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AssinaturasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAssinaturaDto: CreateAssinaturaDto): import(".prisma/client").Prisma.Prisma__AssinaturaClient<{
        id: number;
        idUsuario: number;
        idPlano: number;
        dataFim: Date;
        dataInicio: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        usuario: {
            nomeCompleto: string;
            email: string;
            senhaHash: string;
            dataCadastro: Date;
            id: number;
        };
        plano: {
            id: number;
            nome: string;
            descricao: string | null;
            preco: import("@prisma/client/runtime/library").Decimal;
            duracaoMeses: number;
        };
    } & {
        id: number;
        idUsuario: number;
        idPlano: number;
        dataFim: Date;
        dataInicio: Date;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__AssinaturaClient<({
        usuario: {
            nomeCompleto: string;
            email: string;
            senhaHash: string;
            dataCadastro: Date;
            id: number;
        };
        plano: {
            id: number;
            nome: string;
            descricao: string | null;
            preco: import("@prisma/client/runtime/library").Decimal;
            duracaoMeses: number;
        };
    } & {
        id: number;
        idUsuario: number;
        idPlano: number;
        dataFim: Date;
        dataInicio: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateAssinaturaDto: UpdateAssinaturaDto): import(".prisma/client").Prisma.Prisma__AssinaturaClient<{
        id: number;
        idUsuario: number;
        idPlano: number;
        dataFim: Date;
        dataInicio: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__AssinaturaClient<{
        id: number;
        idUsuario: number;
        idPlano: number;
        dataFim: Date;
        dataInicio: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
