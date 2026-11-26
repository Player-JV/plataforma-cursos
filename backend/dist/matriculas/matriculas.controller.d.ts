import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
export declare class MatriculasController {
    private readonly matriculasService;
    constructor(matriculasService: MatriculasService);
    create(createMatriculaDto: CreateMatriculaDto): Promise<{
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
        id: number;
        idUsuario: number;
        idCurso: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        usuario: {
            id: number;
            email: string;
            nomeCompleto: string;
            senhaHash: string;
            dataCadastro: Date;
        };
        curso: {
            categoria: {
                id: number;
                nome: string;
                descricao: string | null;
            };
        } & {
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
        id: number;
        idUsuario: number;
        idCurso: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MatriculaClient<({
        usuario: {
            id: number;
            email: string;
            nomeCompleto: string;
            senhaHash: string;
            dataCadastro: Date;
        };
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
        id: number;
        idUsuario: number;
        idCurso: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateMatriculaDto: UpdateMatriculaDto): import(".prisma/client").Prisma.Prisma__MatriculaClient<{
        id: number;
        idUsuario: number;
        idCurso: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MatriculaClient<{
        id: number;
        idUsuario: number;
        idCurso: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
