import { TrilhasService } from './trilhas.service';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';
export declare class TrilhasController {
    private readonly trilhasService;
    constructor(trilhasService: TrilhasService);
    create(createTrilhaDto: CreateTrilhaDto): import(".prisma/client").Prisma.Prisma__TrilhaClient<{
        titulo: string;
        id: number;
        descricao: string | null;
        idCategoria: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        categoria: {
            id: number;
            nome: string;
            descricao: string | null;
        };
        cursos: ({
            curso: {
                titulo: string;
                id: number;
                descricao: string | null;
                nivel: string;
                totalAulas: number;
                totalHoras: number;
                idInstrutor: number;
                idCategoria: number;
                dataPublicacao: Date;
            };
        } & {
            idCurso: number;
            ordem: number;
            idTrilha: number;
        })[];
    } & {
        titulo: string;
        id: number;
        descricao: string | null;
        idCategoria: number;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TrilhaClient<({
        categoria: {
            id: number;
            nome: string;
            descricao: string | null;
        };
        cursos: ({
            curso: {
                titulo: string;
                id: number;
                descricao: string | null;
                nivel: string;
                totalAulas: number;
                totalHoras: number;
                idInstrutor: number;
                idCategoria: number;
                dataPublicacao: Date;
            };
        } & {
            idCurso: number;
            ordem: number;
            idTrilha: number;
        })[];
    } & {
        titulo: string;
        id: number;
        descricao: string | null;
        idCategoria: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateTrilhaDto: UpdateTrilhaDto): import(".prisma/client").Prisma.Prisma__TrilhaClient<{
        titulo: string;
        id: number;
        descricao: string | null;
        idCategoria: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TrilhaClient<{
        titulo: string;
        id: number;
        descricao: string | null;
        idCategoria: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
