import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificacoesService } from './notificacoes.service';

@ApiTags('notificacoes')
@Controller('notificacoes')
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

  private extrairDados(message: any) {
    const raw = message?.value ?? message;
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  }

  @EventPattern('usuario-cadastrado')
  async onUsuarioCadastrado(@Payload() message: any) {
    const data = this.extrairDados(message);
    console.log('[KAFKA CONSUMER] usuario-cadastrado:', data);
    await this.notificacoesService.salvarEEnviar({
      idUsuario: Number(data.idUsuario),
      tipo: 'BOAS_VINDAS',
      titulo: 'Bem-vindo à Plataforma!',
      mensagem: `Olá, ${data.nome}! Sua conta foi criada com sucesso.`,
    });
  }

  @EventPattern('curso-criado')
  async onCursoCriado(@Payload() message: any) {
    const data = this.extrairDados(message);
    console.log('[KAFKA CONSUMER] curso-criado:', data);
    await this.notificacoesService.salvarEEnviar({
      idUsuario: null,
      tipo: 'NOVO_CURSO',
      titulo: 'Novo curso disponível!',
      mensagem: `O curso "${data.titulo}" acabou de ser publicado.`,
    });
  }

  @EventPattern('matricula-criada')
  async onMatriculaCriada(@Payload() message: any) {
    const data = this.extrairDados(message);
    console.log('[KAFKA CONSUMER] matricula-criada:', data);
    await this.notificacoesService.salvarEEnviar({
      idUsuario: Number(data.idUsuario),
      tipo: 'MATRICULA',
      titulo: 'Matrícula confirmada!',
      mensagem: `Você já tem acesso ao curso "${data.tituloCurso}".`,
    });
  }

  @EventPattern('pagamento-aprovado')
  async onPagamentoAprovado(@Payload() message: any) {
    const data = this.extrairDados(message);
    console.log('[KAFKA CONSUMER] pagamento-aprovado:', data);
    await this.notificacoesService.salvarEEnviar({
      idUsuario: Number(data.idUsuario),
      tipo: 'PAGAMENTO',
      titulo: 'Pagamento aprovado!',
      mensagem: `Pagamento de R$ ${data.valorPago} via ${data.metodoPagamento} confirmado.`,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario') idUsuario: string) {
    return this.notificacoesService.findByUsuario(+idUsuario);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/lida')
  marcarComoLida(@Param('id') id: string) {
    return this.notificacoesService.marcarComoLida(+id);
  }
}