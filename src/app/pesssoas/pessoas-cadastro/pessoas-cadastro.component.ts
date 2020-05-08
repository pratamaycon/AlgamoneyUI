import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.scss']
})
export class PessoasCadastroComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    cardType: new FormControl(null)
  });

  constructor() { }

  ngOnInit(): void {
  }

  enviarFormulario() {

  }

}
