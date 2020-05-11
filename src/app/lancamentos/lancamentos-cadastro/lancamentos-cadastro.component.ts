import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss'],
})
export class LancamentosCadastroComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    vencimento: new FormControl(null, [Validators.required]),
    descricao: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    valor: new FormControl(null, [Validators.required]),
    categoria: new FormControl(null, [Validators.required]),
    pessoa: new FormControl(null, [Validators.required]),
    cardType: new FormControl(null)
  });

  public value: number;
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

    this.categorias = [
      { label: 'Alimentação', value: 1 },
      { label: 'Transporte', value: 2 },
    ];

    this.pessoas = [
      { label: 'João da Silva', value: 4 },
      { label: 'Sebastião Souza', value: 9 },
      { label: 'Maria Abadia', value: 3 },
    ];
  }

  enviarFormulario() {

  }
}
