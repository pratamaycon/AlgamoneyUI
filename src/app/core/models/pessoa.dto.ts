import { Contato } from './contatos';

export class PessoaDTO {
  codigo: number;
  nome: string;
  ativo: boolean;
  endereco: Endereco;
  contatos = new Array<Contato>();

  constructor(codigo?: number, nome?: string, ativo?: boolean, endereco?: Endereco, contatos?: Array<Contato>) {
    this.codigo = codigo;
    this.nome = nome;
    this.ativo = ativo;
    this.endereco = endereco;
    this.contatos = contatos;
  }

}

export class Endereco {
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  estado: string;
  logradouro: string;
  numero: string;

  constructor(bairro?: string, cep?: string, cidade?: string, complemento?: string,
              estado?: string, logradouro?: string, numero?: string ) {
    this.bairro = bairro;
    this.cep = cep;
    this.cidade = cidade;
    this.complemento = complemento;
    this.estado = estado;
    this.logradouro = logradouro;
    this.numero = numero;
  }
}
