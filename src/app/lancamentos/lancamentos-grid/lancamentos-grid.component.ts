import { Table } from 'primeng/table/table';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { LancamentoFilter } from './../LancamentoFilter';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.scss']
})
export class LancamentosGridComponent implements OnInit, OnChanges {

  @Input() lancamentos: Array<any>;
  @Input() cols: Array<any>;
  @Input() filtro: LancamentoFilter;
  @Input() totalRegistros: number;
  @Input() tabela: Table;

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();
  @Output() lanc: EventEmitter<any> = new EventEmitter();
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

  excluir(lancamento: any) {
    this.lanc.emit(lancamento);
    this.template.emit(this.grid);
  }

}
