import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PlanosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPlanoDto: CreatePlanoDto): import(".prisma/client").Prisma.Prisma__PlanoClient<{
        nome: string;
        id: number;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nome: string;
        id: number;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__PlanoClient<{
        nome: string;
        id: number;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updatePlanoDto: UpdatePlanoDto): import(".prisma/client").Prisma.Prisma__PlanoClient<{
        nome: string;
        id: number;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__PlanoClient<{
        nome: string;
        id: number;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
