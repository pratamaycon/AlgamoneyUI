import { Estado } from './estado.dto';
export class Cidade {
  codigo: number;
  nome: string;
  estado = new Estado();
}
