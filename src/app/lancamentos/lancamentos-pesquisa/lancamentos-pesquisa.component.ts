import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoDTO } from './../lancamento.dto';
import { LancamentoFilter } from './../LancamentoFilter';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LancamentoService } from '../service/lancamento.service';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Table } from 'primeng/table/table';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss'],
})
export class LancamentosPesquisaComponent implements OnInit {

  public cols: any[];
  public lancamentos: Array<any> = [];

  public totalRegistros = 0;
  public filtro = new LancamentoFilter();

  public formulario: FormGroup = new FormGroup({
    descricao: new FormControl(null),
    vencimentoInicio: new FormControl(null),
    vencimentoFim: new FormControl(null),
  });

  tabela: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private handlerService: ErrorHandlerService
    ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'pessoa', header: 'Pessoa', width: '20%' },
      { field: 'descricao', header: 'Descrição', width: '20%' },
      { field: 'dataVencimento', header: 'Vencimento', width: '18%' },
      { field: 'dataPagamento', header: 'Pagamento', width: '15%' },
      { field: 'valor', header: 'Valor', width: '15%' }
    ];
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
    .subscribe( (resultado: any) => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    },
      (error: any) => { this.handlerService.handle(error); }
    );
  }

   aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: LancamentoDTO) {
    const toastOptions: ToastOptions = {
      title: 'Exclusão',
      msg: 'Lançamento excluído com sucesso',
      showClose: true,
      timeout: 1500,
      theme: 'bootstrap'
    };
    this.lancamentoService.excluir(lancamento.codigo)
      .subscribe( ( _ ) => {

        // console.log(this.tabela.first);

        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.reset();
        }

        this.toastyService.success(toastOptions);
      },
        (error: any) => { this.handlerService.handle(error); }
      );
  }

  confirmarExclusao(lancamento: LancamentoDTO) {
    this.confirmationService.confirm({
      message: 'Tem Certeza que deseja Excluir ?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  templateTable(table)  {
    this.tabela = table;
  }
}
