export class CategoriaDTO {
  codigo: number;
  nome: string;

  constructor(codigo: number, nome?: string) {
    this.codigo = codigo;
    this.nome = nome;
  }
}

