
import { LancamentoDTO } from '../Lancamento.dto';
import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../service/lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss'],
})
export class LancamentosPesquisaComponent implements OnInit {
  cols: any[];

  lancamentos: Array<any> = [];

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'pessoa', header: 'Pessoa', width: '20%' },
      { field: 'descricao', header: 'Descrição', width: '20%' },
      { field: 'dataVencimento', header: 'Vencimento', width: '18%' },
      { field: 'dataPagamento', header: 'Pagamento', width: '18%' },
      { field: 'valor', header: 'Valor', width: '12%' }
    ];

    this.lancamentoService.resumir()
      .subscribe( (lancamentos) => {
        this.lancamentos = lancamentos.content;
      });
  }
}
