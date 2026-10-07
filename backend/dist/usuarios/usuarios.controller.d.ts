import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        nomeCompleto: string;
        email: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nomeCompleto: string;
        email: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        nomeCompleto: string;
        email: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        nomeCompleto: string;
        email: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        nomeCompleto: string;
        email: string;
        senhaHash: string;
        dataCadastro: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
