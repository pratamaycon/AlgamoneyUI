import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PessoaDTO, Endereco } from './../../core/pessoa.dto';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { ToastyService } from 'ng2-toasty';
import { PessoaService } from '../services/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.scss'],
})
export class PessoasCadastroComponent implements OnInit {
  public formulario: FormGroup = new FormGroup({
    codigo: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    endereco: new FormGroup({
      logradouro: new FormControl(null, [Validators.required]),
      numero: new FormControl(null, [Validators.required]),
      bairro: new FormControl(null, [Validators.required]),
      cep: new FormControl(null, [Validators.required]),
      cidade: new FormControl(null, [Validators.required]),
      estado: new FormControl(null, [Validators.required]),
      complemento: new FormControl(null),
    }),
    ativo: new FormControl(true)
  });

  public pessoa: PessoaDTO;

  constructor(
    private handlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private pessoasService: PessoaService,
    private routes: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Nova Pessoa');

    this.pessoa = new PessoaDTO();

    const codPessoa = this.routes.snapshot.params.codigo;

    if (codPessoa) {
      this.carregarPessoas(codPessoa);
    }
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa(): void {
    this.pessoasService.adicionar(this.formulario.value)
        .subscribe((pessoaAdicionada: PessoaDTO ) => {
        this.toastyService.success({
          title: 'Adicionado',
          timeout: 1500,
          msg: 'Pessoa adicionada com sucesso!',
        });
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      },
      (erro: any) => this.handlerService.handle(erro)
    );
  }

  atualizarPessoa() {
    this.pessoasService.atualizar(this.formulario.value)
        .subscribe((pessoa: PessoaDTO) => {
        this.toastyService.success({
          title: 'Alterando',
          timeout: 1500,
          msg: 'Pessoa alterada com sucesso!',
        });
        this.atualizarTitulo(pessoa);
      },
      (erro: any) => this.handlerService.handle(erro)
    );
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarPessoas(codigo: number): void {
    this.pessoasService.buscarPorCodigo(codigo).subscribe(
      (pessoa: PessoaDTO) => {
        this.formulario.patchValue(pessoa);
      },
      (erro: any) => this.handlerService.handle(erro)
    );
  }

  novo(): void {
    this.formulario.reset();
    this.router.navigate(['pessoas/novo']);
  }

  atualizarTitulo(pessoa: PessoaDTO): void {
    this.title.setTitle(`Edição de Pessoa: ${pessoa.nome}`);
  }
}
