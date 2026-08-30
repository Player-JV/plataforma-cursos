import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AulasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAulaDto: CreateAulaDto): import(".prisma/client").Prisma.Prisma__AulaClient<{
        id: number;
        titulo: string;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        modulo: {
            id: number;
            titulo: string;
            ordem: number;
            idCurso: number;
        };
    } & {
        id: number;
        titulo: string;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__AulaClient<({
        modulo: {
            id: number;
            titulo: string;
            ordem: number;
            idCurso: number;
        };
    } & {
        id: number;
        titulo: string;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateAulaDto: UpdateAulaDto): import(".prisma/client").Prisma.Prisma__AulaClient<{
        id: number;
        titulo: string;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__AulaClient<{
        id: number;
        titulo: string;
        ordem: number;
        tipoConteudo: string;
        urlConteudo: string | null;
        duracaoMinutos: number;
        idModulo: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
