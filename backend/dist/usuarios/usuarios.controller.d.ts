import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UsuarioClient<{
        id: number;
        email: string;
        nomeCompleto: string;
        senhaHash: string;
        dataCadastro: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
