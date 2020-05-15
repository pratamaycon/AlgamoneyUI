import { PessoaFiltro } from './../PessoaFiltro';
import { PessoaService } from './../services/pessoa.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api/public_api';

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

  constructor(private pessoasService: PessoaService) {}

  ngOnInit(): void {
    this.pesquisar();

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
      (error: any) => console.log(error)
    );
  }

  public aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
