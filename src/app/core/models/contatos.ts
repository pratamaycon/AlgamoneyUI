export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(codigo?: number, nome?: string, email?: string, telefone?: string ) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.codigo = codigo;
  }

}
