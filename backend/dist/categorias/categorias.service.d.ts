import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoriaDto: CreateCategoriaDto): import(".prisma/client").Prisma.Prisma__CategoriaClient<{
        nome: string;
        id: number;
        descricao: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nome: string;
        id: number;
        descricao: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__CategoriaClient<{
        nome: string;
        id: number;
        descricao: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): import(".prisma/client").Prisma.Prisma__CategoriaClient<{
        nome: string;
        id: number;
        descricao: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__CategoriaClient<{
        nome: string;
        id: number;
        descricao: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
