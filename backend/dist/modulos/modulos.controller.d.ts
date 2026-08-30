import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
export declare class ModulosController {
    private readonly modulosService;
    constructor(modulosService: ModulosService);
    create(createModuloDto: CreateModuloDto): import(".prisma/client").Prisma.Prisma__ModuloClient<{
        id: number;
        titulo: string;
        ordem: number;
        idCurso: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        curso: {
            id: number;
            descricao: string | null;
            titulo: string;
            nivel: string;
            totalAulas: number;
            totalHoras: number;
            idInstrutor: number;
            idCategoria: number;
            dataPublicacao: Date;
        };
    } & {
        id: number;
        titulo: string;
        ordem: number;
        idCurso: number;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ModuloClient<({
        curso: {
            id: number;
            descricao: string | null;
            titulo: string;
            nivel: string;
            totalAulas: number;
            totalHoras: number;
            idInstrutor: number;
            idCategoria: number;
            dataPublicacao: Date;
        };
        aulas: {
            id: number;
            titulo: string;
            ordem: number;
            tipoConteudo: string;
            urlConteudo: string | null;
            duracaoMinutos: number;
            idModulo: number;
        }[];
    } & {
        id: number;
        titulo: string;
        ordem: number;
        idCurso: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateModuloDto: UpdateModuloDto): import(".prisma/client").Prisma.Prisma__ModuloClient<{
        id: number;
        titulo: string;
        ordem: number;
        idCurso: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ModuloClient<{
        id: number;
        titulo: string;
        ordem: number;
        idCurso: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
