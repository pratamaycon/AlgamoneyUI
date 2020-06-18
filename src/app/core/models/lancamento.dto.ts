import { CategoriaDTO } from './categoria.dto';
import { PessoaDTO } from './pessoa.dto';

export class LancamentoDTO {
  codigo: number;
  categoria: CategoriaDTO;
  dataPagamento: Date;
  dataVencimento: Date;
  descricao: string;
  pessoa: PessoaDTO;
  tipo: string;
  valor: number;
  observacao: string;
  anexo: string;
  urlAnexo: string;

  constructor(tipo?: string, valor?: number, descricao?: string, dataPagamento?: Date,
              dataVencimento?: Date, pessoa?: PessoaDTO, categoria?: CategoriaDTO,
              observacao?: string, codigo?: number ) {
    this.tipo = tipo;
    this.valor = valor;
    this.descricao = descricao;
    this.dataPagamento = dataPagamento;
    this.dataVencimento = dataVencimento;
    this.pessoa = pessoa;
    this.categoria = categoria;
    this.observacao = observacao;
    this.codigo = codigo;
  }

}

