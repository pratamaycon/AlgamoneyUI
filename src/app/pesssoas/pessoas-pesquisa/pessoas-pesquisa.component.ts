import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PessoaFiltro } from './../PessoaFiltro';
import { PessoaService } from './../services/pessoa.service';
import { PessoaDTO } from 'src/app/core/models/pessoa.dto';
import { ErrorHandlerService } from '../../core/service/error-handler.service';

import { LazyLoadEvent } from 'primeng/api/public_api';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
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
    private handlerService: ErrorHandlerService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pessoas');
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
   let msg: string;
   this.pessoasService.excluir(pessoa.codigo).subscribe(
      ( _ ) => {
        msg = 'Pessoa excluída com sucesso';
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.reset();
        }
        this.toastyService.success({title: 'Exclusão', timeout: 1500, msg});
      },
      (error: any) => {
        this.handlerService.handle(error);
      }
    );
  }

  public confirmarExclusao(pessoa: PessoaDTO) {
    this.confirmationService.confirm({
      message: 'Tem Certeza que deseja Excluir ?',
      accept: () => {
        this.excluir(pessoa);
      },
    });
  }

  public bidingTable(table: Table) {
    this.tabela = table;
  }

  public ativarPropriedade(pessoa: PessoaDTO) {
    let msg: string;
    let codigo: number;
    let ativo: boolean;
    if (pessoa.ativo) {
      msg = 'Pessoa desativada com sucesso';
      ativo = !pessoa.ativo;
      codigo = pessoa.codigo;
    } else {
      msg = 'Pessoa ativada com sucesso';
      ativo = !pessoa.ativo;
      codigo = pessoa.codigo;
    }

    this.pessoasService.ativarPropriedade(codigo, ativo)
      .subscribe( ( _ ) => {
        this.toastyService.success({title: 'Atualização', timeout: 1500, msg});
        this.pesquisar(this.filtro.pagina);
    },
    (error: any) => this.handlerService.handle(error)
    );
  }
}
