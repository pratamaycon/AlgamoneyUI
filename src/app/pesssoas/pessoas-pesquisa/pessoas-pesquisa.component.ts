import { ErrorHandlerService } from './../../core/error-handler.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PessoaDTO } from './../pessoa.dto';
import { PessoaFiltro } from './../PessoaFiltro';
import { PessoaService } from './../services/pessoa.service';

import { LazyLoadEvent } from 'primeng/api/public_api';
import { ConfirmationService } from 'primeng/api';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.scss'],
})
export class PessoasPesquisaComponent implements OnInit {
  public cols: any[];

  public pessoas: Array<any> = [];

  public totalRegistros = 0;
  public filtro = new PessoaFiltro();

  public formulario: FormGroup = new FormGroup({
    nome: new FormControl(null),
  });

  public tabela: Table;

  constructor(
    private pessoasService: PessoaService,
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService,
    private handlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'nome', header: 'Nome', width: '30%' },
      { field: 'cidade', header: 'Cidade', width: '20%' },
      { field: 'estado', header: 'Estado', width: '20%' },
      { field: 'ativo', header: 'Status', width: '15%' },
    ];
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro).subscribe(
      (resultado: any) => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      },
      (error: any) => this.handlerService.handle(error)
    );
  }

  public aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  public excluir(pessoa: PessoaDTO) {
    const toastOptions: ToastOptions = {
      title: 'Exclusão',
      msg: 'Pessoa excluída com sucesso',
      showClose: true,
      timeout: 1500,
      theme: 'bootstrap',
    };
    this.pessoasService.excluir(pessoa.codigo).subscribe(
      (_) => {
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.reset();
        }
      },
      (error: any) => {
        this.handlerService.handle(error);
      }
    );
    this.toastyService.success(toastOptions);
  }

  public confirmarExclusao(pessoa: PessoaDTO) {
    this.confirmationService.confirm({
      message: 'Tem Certeza que deseja Excluir ?',
      accept: () => {
        this.excluir(pessoa);
      },
    });
  }

  public bidingTable(table) {
    this.tabela = table;
  }
}
