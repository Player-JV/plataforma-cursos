import { TrilhasService } from './trilhas.service';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';
export declare class TrilhasController {
    private readonly trilhasService;
    constructor(trilhasService: TrilhasService);
    create(createTrilhaDto: CreateTrilhaDto): import(".prisma/client").Prisma.Prisma__TrilhaClient<{
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        categoria: {
            nome: string;
            id: number;
            descricao: string | null;
        };
    } & {
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TrilhaClient<({
        categoria: {
            nome: string;
            id: number;
            descricao: string | null;
        };
    } & {
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateTrilhaDto: UpdateTrilhaDto): import(".prisma/client").Prisma.Prisma__TrilhaClient<{
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TrilhaClient<{
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
