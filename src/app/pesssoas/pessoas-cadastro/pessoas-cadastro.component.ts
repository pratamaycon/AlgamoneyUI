import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.scss']
})
export class PessoasCadastroComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    logradouro: new FormControl(null, [Validators.required]),
    numero: new FormControl(null, [Validators.required]),
    bairro: new FormControl(null, [Validators.required]),
    cep: new FormControl(null, [Validators.required]),
    cidade: new FormControl(null, [Validators.required]),
    estado: new FormControl(null, [Validators.required]),
  });

  public value: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.formulario.valid);
  }

  enviarFormulario() {

  }

}
