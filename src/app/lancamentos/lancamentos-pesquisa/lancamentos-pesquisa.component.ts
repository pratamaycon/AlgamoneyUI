import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss'],
})
export class LancamentosPesquisaComponent implements OnInit {
  cols: any[];

  lancamentos = [
    {
      tipo: 'DESPESA',
      descricao: 'Compra de pão',
      dataVencimento: new Date(2017, 5, 30),
      dataPagamento: null,
      valor: 4.55,
      pessoa: 'Padaria do José',
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de Sofware',
      dataVencimento: new Date(2017, 6, 10),
      dataPagamento: new Date(2017, 6, 9),
      valor: 80000,
      pessoa: 'Atacado Brasil',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Impostos',
      dataVencimento: new Date(2017, 7, 20),
      dataPagamento: null,
      valor: 14312,
      pessoa: 'Mistério da Fazenda',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Mensalidade da escola',
      dataVencimento: new Date(2017, 6, 5),
      dataPagamento: new Date(2017, 5, 30),
      valor: 800,
      pessoa: 'Escola Abelha Rainha',
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de Carro',
      dataVencimento: new Date(2017, 8, 18),
      dataPagamento: null,
      valor: 55000,
      pessoa: 'Sebastião de Souza',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Aluguel',
      dataVencimento: new Date(2017, 7, 10),
      dataPagamento: new Date(2017, 7, 9),
      valor: 1750,
      pessoa: 'Casa de Imóveis',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Mensalidade de Musculação',
      dataVencimento: new Date(2017, 7, 17),
      dataPagamento: null,
      valor: 180,
      pessoa: 'Academia Top',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.cols = [
      { field: 'pessoa', header: 'Pessoa', width: '20%' },
      { field: 'descricao', header: 'Descrição', width: '20%' },
      { field: 'dataVencimento', header: 'Vencimento', width: '18%' },
      { field: 'dataPagamento', header: 'Pagamento', width: '18%' },
      { field: 'valor', header: 'Valor', width: '12%' }
    ];
  }
}
