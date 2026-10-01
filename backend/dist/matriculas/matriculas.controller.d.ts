import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
export declare class MatriculasController {
    private readonly matriculasService;
    constructor(matriculasService: MatriculasService);
    create(createMatriculaDto: CreateMatriculaDto): import(".prisma/client").Prisma.Prisma__MatriculaClient<{
        id: number;
        idCurso: number;
        idUsuario: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        usuario: {
            email: string;
            nomeCompleto: string;
            senhaHash: string;
            dataCadastro: Date;
            id: number;
        };
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
        idCurso: number;
        idUsuario: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MatriculaClient<({
        usuario: {
            email: string;
            nomeCompleto: string;
            senhaHash: string;
            dataCadastro: Date;
            id: number;
        };
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
        idCurso: number;
        idUsuario: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateMatriculaDto: UpdateMatriculaDto): import(".prisma/client").Prisma.Prisma__MatriculaClient<{
        id: number;
        idCurso: number;
        idUsuario: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MatriculaClient<{
        id: number;
        idCurso: number;
        idUsuario: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
