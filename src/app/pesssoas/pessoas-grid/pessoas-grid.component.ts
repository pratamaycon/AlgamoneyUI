import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Output, EventEmitter, ViewChild } from '@angular/core';

import { Table } from 'primeng/table/table';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';

import { PessoaFiltro } from './../PessoaFiltro';
import { PessoaDTO } from 'src/app/core/models/pessoa.dto';
@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.scss']
})
export class PessoasGridComponent implements OnInit, OnChanges {

  @Input()  pessoas: Array<any>;
  @Input()  cols: Array<any>;
  @Input()  filtro: PessoaFiltro;
  @Input()  totalRegistros: number;
  @Input()  tabela: Table;

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();
  @Output() ps: EventEmitter<any> = new EventEmitter();
  @Output() propriedade: EventEmitter<any> = new EventEmitter();
  @Output() template: EventEmitter<any> = new EventEmitter();

  @ViewChild('tabela', { static: false }) grid;

  constructor() { }

  ngOnChanges() {
    this.tabela = this.grid;
  }

  ngOnInit(): void {
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    this.lazyLoad.emit(event);
  }

  excluir(pessoa: PessoaDTO) {
    this.ps.emit(pessoa);
    this.template.emit(this.grid);
  }

  ativarPropriedade(pessoa: PessoaDTO) {
    this.propriedade.emit(pessoa);
  }
}
