import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
export declare class AulasController {
    private readonly aulasService;
    constructor(aulasService: AulasService);
    create(createAulaDto: CreateAulaDto): import(".prisma/client").Prisma.Prisma__AulaClient<{
        titulo: string;
        id: number;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        modulo: {
            titulo: string;
            id: number;
            idCurso: number;
            ordem: number;
        };
    } & {
        titulo: string;
        id: number;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__AulaClient<({
        modulo: {
            titulo: string;
            id: number;
            idCurso: number;
            ordem: number;
        };
    } & {
        titulo: string;
        id: number;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateAulaDto: UpdateAulaDto): import(".prisma/client").Prisma.Prisma__AulaClient<{
        titulo: string;
        id: number;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__AulaClient<{
        titulo: string;
        id: number;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
