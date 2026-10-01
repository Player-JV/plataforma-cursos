import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
export declare class CursosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCursoDto: CreateCursoDto): import(".prisma/client").Prisma.Prisma__CursoClient<{
        id: number;
        descricao: string | null;
        titulo: string;
        nivel: string;
        totalAulas: number;
        totalHoras: number;
        idInstrutor: number;
        idCategoria: number;
        dataPublicacao: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        categoria: {
            nome: string;
            id: number;
            descricao: string | null;
        };
        instrutor: {
            email: string;
            nomeCompleto: string;
            senhaHash: string;
            dataCadastro: Date;
            id: number;
        };
    } & {
        id: number;
        descricao: string | null;
        titulo: string;
        nivel: string;
        totalAulas: number;
        totalHoras: number;
        idInstrutor: number;
        idCategoria: number;
        dataPublicacao: Date;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__CursoClient<({
        categoria: {
            nome: string;
            id: number;
            descricao: string | null;
        };
        instrutor: {
            email: string;
            nomeCompleto: string;
            senhaHash: string;
            dataCadastro: Date;
            id: number;
        };
        modulos: {
            id: number;
            titulo: string;
            ordem: number;
            idCurso: number;
        }[];
    } & {
        id: number;
        descricao: string | null;
        titulo: string;
        nivel: string;
        totalAulas: number;
        totalHoras: number;
        idInstrutor: number;
        idCategoria: number;
        dataPublicacao: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateCursoDto: UpdateCursoDto): import(".prisma/client").Prisma.Prisma__CursoClient<{
        id: number;
        descricao: string | null;
        titulo: string;
        nivel: string;
        totalAulas: number;
        totalHoras: number;
        idInstrutor: number;
        idCategoria: number;
        dataPublicacao: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__CursoClient<{
        id: number;
        descricao: string | null;
        titulo: string;
        nivel: string;
        totalAulas: number;
        totalHoras: number;
        idInstrutor: number;
        idCategoria: number;
        dataPublicacao: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
