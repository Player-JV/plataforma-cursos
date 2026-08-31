export interface Usuario {
  id?: number;
  nomeCompleto: string;
  email: string;
  senhaHash: string;
  dataCadastro?: string;
}

export interface Categoria {
  id?: number;
  nome: string;
  descricao?: string;
}

export interface Curso {
  id?: number;
  titulo: string;
  descricao?: string;
  nivel: string;
  totalAulas?: number;
  totalHoras?: number;
  idInstrutor: number;
  idCategoria: number;
  categoria?: Categoria;
}

export interface Modulo {
  id?: number;
  titulo: string;
  ordem: number;
  idCurso: number;
  curso?: Curso;
}

export interface Aula {
  id?: number;
  titulo: string;
  tipoConteudo: string;
  urlConteudo?: string;
  duracaoMinutos?: number;
  ordem: number;
  idModulo: number;
  modulo?: Modulo;
}

export interface Matricula {
  id?: number;
  idUsuario: number;
  idCurso: number;
  dataMatricula?: string;
  dataConclusao?: string;
  usuario?: Usuario;
  curso?: Curso;
}

export interface Trilha {
  id?: number;
  titulo: string;
  descricao?: string;
  idCategoria: number;
  categoria?: Categoria;
}

export interface Plano {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  duracaoMeses: number;
}

export interface Assinatura {
  id?: number;
  idUsuario: number;
  idPlano: number;
  dataInicio?: string;
  dataFim: string;
  usuario?: Usuario;
  plano?: Plano;
}

export interface Pagamento {
  id?: number;
  valorPago: number;
  metodoPagamento: string;
  idTransacaoGateway: string;
  idAssinatura: number;
  dataPagamento?: string;
}