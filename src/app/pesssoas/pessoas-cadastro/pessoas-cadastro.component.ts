import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PessoaDTO, Endereco } from './../../core/pessoa.dto';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { ToastyService } from 'ng2-toasty';
import { PessoaService } from '../services/pessoa.service';

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
    complemento: new FormControl(null)
  });

  public pessoa: PessoaDTO;

  constructor(
    private handlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private pessoasService: PessoaService,
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  private configurarFormulario(): PessoaDTO {
    this.pessoa = new PessoaDTO(
      null,
      this.formulario.controls.nome.value,
      true,
      new Endereco(
        this.formulario.controls.bairro.value,
        this.formulario.controls.cep.value,
        this.formulario.controls.cidade.value,
        this.formulario.controls.complemento.value,
        this.formulario.controls.estado.value,
        this.formulario.controls.logradouro.value,
        this.formulario.controls.numero.value,
      )
    );
    return this.pessoa;
  }

  salvar() {
    const pessoa = this.configurarFormulario();
    this.pessoasService.adicionar(pessoa).subscribe((_) => {
      this.toastyService.success({
        title: 'Adicionado',
        timeout: 1500,
        msg: 'Pessoa adicionada com sucesso!',
      });
      this.formulario.reset();
      this.pessoa = null;
    },
    (erro: any) => this.handlerService.handle(erro)
    );
  }

}
