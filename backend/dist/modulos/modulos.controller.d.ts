import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
export declare class ModulosController {
    private readonly modulosService;
    constructor(modulosService: ModulosService);
    create(createModuloDto: CreateModuloDto): import(".prisma/client").Prisma.Prisma__ModuloClient<{
        titulo: string;
        id: number;
        idCurso: number;
        ordem: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
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
        titulo: string;
        id: number;
        idCurso: number;
        ordem: number;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ModuloClient<({
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
        aulas: {
            titulo: string;
            id: number;
            ordem: number;
            tipoConteudo: string;
            urlConteudo: string | null;
            duracaoMinutos: number;
            idModulo: number;
        }[];
    } & {
        titulo: string;
        id: number;
        idCurso: number;
        ordem: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateModuloDto: UpdateModuloDto): import(".prisma/client").Prisma.Prisma__ModuloClient<{
        titulo: string;
        id: number;
        idCurso: number;
        ordem: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ModuloClient<{
        titulo: string;
        id: number;
        idCurso: number;
        ordem: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
