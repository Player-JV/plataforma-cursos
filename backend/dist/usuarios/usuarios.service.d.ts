import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    } | null>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
