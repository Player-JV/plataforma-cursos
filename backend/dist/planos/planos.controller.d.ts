import { PlanosService } from './planos.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
export declare class PlanosController {
    private readonly planosService;
    constructor(planosService: PlanosService);
    create(createPlanoDto: CreatePlanoDto): import(".prisma/client").Prisma.Prisma__PlanoClient<{
        nome: string;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nome: string;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
        id: number;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PlanoClient<{
        nome: string;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updatePlanoDto: UpdatePlanoDto): import(".prisma/client").Prisma.Prisma__PlanoClient<{
        nome: string;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__PlanoClient<{
        nome: string;
        descricao: string | null;
        preco: import("@prisma/client/runtime/library").Decimal;
        duracaoMeses: number;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
