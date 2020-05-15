import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { PessoaFiltro } from './../PessoaFiltro';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LancamentoFilter } from 'src/app/lancamentos/LancamentoFilter';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.scss']
})
export class PessoasGridComponent implements OnInit {

  @Input() public pessoas: Array<any>;
  @Input() public cols: Array<any>;
  @Input() public filtro: PessoaFiltro;
  @Input() public totalRegistros: number;

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    this.lazyLoad.emit(event);
  }

}
