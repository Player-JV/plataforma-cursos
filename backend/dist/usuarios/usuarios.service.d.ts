import { NotificacoesService } from '../notificacoes/notificacoes.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    private prisma;
    private notificacoesService;
    constructor(prisma: PrismaService, notificacoesService: NotificacoesService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    } | null>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
