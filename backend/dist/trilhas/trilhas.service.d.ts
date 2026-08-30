import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class TrilhasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTrilhaDto: CreateTrilhaDto): import(".prisma/client").Prisma.Prisma__TrilhaClient<{
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        categoria: {
            id: number;
            nome: string;
            descricao: string | null;
        };
    } & {
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__TrilhaClient<({
        categoria: {
            id: number;
            nome: string;
            descricao: string | null;
        };
    } & {
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateTrilhaDto: UpdateTrilhaDto): import(".prisma/client").Prisma.Prisma__TrilhaClient<{
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__TrilhaClient<{
        id: number;
        descricao: string | null;
        titulo: string;
        idCategoria: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
