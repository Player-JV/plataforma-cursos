import { PrismaService } from '../prisma/prisma.service';
import { NotificacoesService } from '../notificacoes/notificacoes.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
export declare class CursosService {
    private prisma;
    private notificacoesService;
    constructor(prisma: PrismaService, notificacoesService: NotificacoesService);
    create(createCursoDto: CreateCursoDto): Promise<{
        titulo: string;
        id: number;
        descricao: string | null;
        nivel: string;
        totalAulas: number;
        totalHoras: number;
        idInstrutor: number;
        idCategoria: number;
        dataPublicacao: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        categoria: {
            id: number;
            nome: string;
            descricao: string | null;
        };
        instrutor: {
            id: number;
            email: string;
            nomeCompleto: string;
            senhaHash: string;
            dataCadastro: Date;
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
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__CursoClient<({
        categoria: {
            id: number;
            nome: string;
            descricao: string | null;
        };
        instrutor: {
            id: number;
            email: string;
            nomeCompleto: string;
            senhaHash: string;
            dataCadastro: Date;
        };
        modulos: ({
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
        })[];
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
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateCursoDto: UpdateCursoDto): import(".prisma/client").Prisma.Prisma__CursoClient<{
        titulo: string;
        id: number;
        descricao: string | null;
        nivel: string;
        totalAulas: number;
        totalHoras: number;
        idInstrutor: number;
        idCategoria: number;
        dataPublicacao: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__CursoClient<{
        titulo: string;
        id: number;
        descricao: string | null;
        nivel: string;
        totalAulas: number;
        totalHoras: number;
        idInstrutor: number;
        idCategoria: number;
        dataPublicacao: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
