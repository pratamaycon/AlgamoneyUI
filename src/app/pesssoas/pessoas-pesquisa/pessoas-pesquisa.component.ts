
import { Component, OnInit } from '@angular/core';
import { PessoaDTO } from '../Pessoa.dto';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.scss']
})
export class PessoasPesquisaComponent implements OnInit {

  cols: any[];

  pessoas: Array<PessoaDTO> = [
    new PessoaDTO('Mamoel Pinheiro', 'Uberlândia', 'MG', true),
    new PessoaDTO('Sebastião da Silva', 'São Paulo', 'SP', false),
    new PessoaDTO('Carlos da Souza', 'Florianópolis', 'SC', true),
    new PessoaDTO('Luíz Pereira', 'Curitiba', 'PR', true),
    new PessoaDTO('Vilmar Andrade', 'Rio de Janeiro', 'RJ', false),
    new PessoaDTO('Paula Maria', 'Uberlândia', 'MG', true),
  ];

  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'nome', header: 'Nome', width: '40%' },
      { field: 'cidade', header: 'Cidade', width: '15%' },
      { field: 'estado', header: 'Estado', width: '15%' },
      { field: 'ativo', header: 'Status', width: '20%' },
    ];
  }

}
