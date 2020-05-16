export class PessoaDTO {
  codigo: number;
  nome: string;
  ativo: boolean;
  endereco: Endereco;
}

class Endereco {
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  estado: string;
  logradouro: string;
  numero: string;
}
