import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.scss']
})
export class LancamentosGridComponent implements OnInit {

  @Input() lancamentos: Array<any>;
  @Input() cols: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
