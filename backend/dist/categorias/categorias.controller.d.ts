import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    create(createCategoriaDto: CreateCategoriaDto): import(".prisma/client").Prisma.Prisma__CategoriaClient<{
        id: number;
        nome: string;
        descricao: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
        descricao: string | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__CategoriaClient<{
        id: number;
        nome: string;
        descricao: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateCategoriaDto: UpdateCategoriaDto): import(".prisma/client").Prisma.Prisma__CategoriaClient<{
        id: number;
        nome: string;
        descricao: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__CategoriaClient<{
        id: number;
        nome: string;
        descricao: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
