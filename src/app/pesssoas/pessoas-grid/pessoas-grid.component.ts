import { PessoaDTO } from './../Pessoa.dto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.scss']
})
export class PessoasGridComponent implements OnInit {

  @Input() public pessoas: Array<PessoaDTO>;
  @Input() public cols: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
