import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/api/message';


@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss'],
})
export class LancamentosCadastroComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    descricao: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    valor: new FormControl(null),
    cardType: new FormControl(null)
  });

  public value: number;
  public msgs: Message[] = [];
  public tipos: SelectItem[];
  public categorias: SelectItem[];
  public pessoas: SelectItem[];
  public selectedType: string;

  constructor() {}

  ngOnInit(): void {
    this.selectedType = 'RECEITA';

    this.tipos = [
      { label: 'Receita', value: 'RECEITA' },
      { label: 'Despesa', value: 'DESPESA' },
    ];

    this.msgs = [
      {severity: 'error', summary: 'Success Message', detail: 'Order submitted'}
    ];

    this.categorias = [
      { label: 'Alimentação', value: 1 },
      { label: 'Transporte', value: 2 },
    ];

    this.pessoas = [
      { label: 'João da Silva', value: 4 },
      { label: 'Sebastião Souza', value: 9 },
      { label: 'Maria Abadia', value: 3 },
    ];

    console.log(this.formulario.get('descricao').errors.minlength);

  }

  enviarFormulario() {

  }
}
