import { Contato } from './../../core/models/contatos';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EMAILPATTERN } from 'src/app/shared/regex';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.scss']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() public contatos: Array<Contato>;
  public exibindoFormularioContato = false;
  public contatoIndex: number;
  public colsContatos: any;

  public formularioContato: FormGroup = new FormGroup({
    contatos: new FormGroup({
      codigo: new FormControl(null),
      nome: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null,  [Validators.required, Validators.pattern(EMAILPATTERN)]),
      telefone: new FormControl(null)
    })
  });

  constructor() { }

  ngOnInit(): void {
    this.colsContatos = [
      { width: '30%' },
      { width: '28%' },
      { width: '20%' },
      { width: '12%' },
    ]
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contatoIndex = this.contatos.length;
  }

  confirmarContato() {
    this.contatos[this.contatoIndex] = this.formularioContato.value.contatos;
    this.exibindoFormularioContato = false;
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1)
  }

  prepararEdicaoContato(contato: Contato, indice: number) {
    this.exibindoFormularioContato = true;
    this.formularioContato.get('contatos').setValue(contato);
    this.contatoIndex = indice;
  }

  get editando() {
    return this.formularioContato.value.contatos &&
    this.formularioContato.value.contatos.codigo;
  }

}
