import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class MatriculasService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): import(".prisma/client").Prisma.Prisma__MatriculaClient<({
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
    update(id: number, updateMatriculaDto: UpdateMatriculaDto): import(".prisma/client").Prisma.Prisma__MatriculaClient<{
        id: number;
        idCurso: number;
        idUsuario: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__MatriculaClient<{
        id: number;
        idCurso: number;
        idUsuario: number;
        dataConclusao: Date | null;
        dataMatricula: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
