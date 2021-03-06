import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PessoaDTO } from '../../core/models/pessoa.dto';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';

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
      cidade: new FormGroup({
        codigo: new FormControl(null, [Validators.required]),
        nome: new FormControl(null),
        estado: new FormGroup({
          codigo: new FormControl(null, [Validators.required]),
          nome: new FormControl(null),
        })
      }),
      complemento: new FormControl(null),
    }),
    ativo: new FormControl(true),
    contatos: new FormGroup({
      codigo: new FormControl(null),
      nome: new FormControl(null),
      email: new FormControl(null),
      telefone: new FormControl(null)
    })
  });

  public pessoa: PessoaDTO;

  public estados: Array<any> = [];
  public cidades: Array<any> = [];
  public estadoSelecionado: number;

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
    this.pessoa.contatos = [];

    const codPessoa = this.routes.snapshot.params.codigo;

    this.carregarEstados();

    if (codPessoa) {
      this.carregarPessoas(codPessoa);
    }
  }

  onChangeCode(evento) {
    this.estadoSelecionado = evento;
 }

  salvar() {
    this.formulario.value.contatos = this.pessoa.contatos;
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
        this.pessoa = pessoa;

        this.estadoSelecionado = this.pessoa.endereco.cidade ?
            this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.formulario.patchValue(pessoa);
        this.atualizarTitulo(pessoa);
      },
      (erro: any) => this.handlerService.handle(erro)
    );
  }

  carregarEstados() {
    this.pessoasService.listarEstados()
      .subscribe( lista => {
        this.estados = lista.map( uf => ({ label: uf.nome, value: uf.codigo }) );
      },
      (erro: any) => this.handlerService.handle(erro)
      )
  }

  carregarCidades() {
    this.pessoasService.pesquisarCidades(this.estadoSelecionado)
      .subscribe( lista => {
        this.cidades = lista.map( c => ({ label: c.nome, value: c.codigo }) );
      },
      (erro: any) => this.handlerService.handle(erro)
      )
  }

  novo(): void {
    this.formulario.reset();
    this.router.navigate(['pessoas/novo']);
  }

  atualizarTitulo(pessoa: PessoaDTO): void {
    this.title.setTitle(`Edição de Pessoa: ${pessoa.nome}`);
  }
}
