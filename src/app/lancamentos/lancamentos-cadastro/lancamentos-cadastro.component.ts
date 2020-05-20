import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LancamentoService } from './../service/lancamento.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';
import { PessoaService } from 'src/app/pesssoas/services/pessoa.service';

import { SelectItem } from 'primeng/api/selectitem';
import { ToastyService } from 'ng2-toasty';
import { LancamentoDTO } from 'src/app/core/models/lancamento.dto';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss'],
})
export class LancamentosCadastroComponent implements OnInit {
  public formulario: FormGroup = new FormGroup({
    codigo:  new FormControl(null),
    dataVencimento: new FormControl(null, [Validators.required]),
    dataPagamento: new FormControl(null),
    descricao: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    valor: new FormControl(null, [Validators.required]),
    categoria: new FormGroup({
      codigo: new FormControl(null, [Validators.required]),
    }),
    pessoa: new FormGroup({
      codigo: new FormControl(null, [Validators.required]),
    }),
    tipo: new FormControl('RECEITA', [Validators.required]),
    observacao: new FormControl(null)
  });

  public value: number;
  public tipos: SelectItem[] = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
  public categorias: SelectItem[] = [];
  public pessoas: SelectItem[] = [];
  public selectedType: string;

  public lancamento: LancamentoDTO;

  constructor(
    private categoriasService: CategoriaService,
    private pessoasService: PessoaService,
    private lancamentoService: LancamentoService,
    private handlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private routes: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Novo Lançamento');

    this.lancamento = new LancamentoDTO();
    const codLancamento = this.routes.snapshot.params.codigo;

    if (codLancamento) {
      this.carregarLancamentos(codLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarLancamentos(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .subscribe( (lancamento: LancamentoDTO) => {
        this.formulario.patchValue(lancamento);
        this.atualizarTitulo(lancamento);
    },
    (erro: any) => this.handlerService.handle(erro)
    );
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  salvar(): void {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento(): void {
    this.lancamentoService.adicionar(this.formulario.value)
      .subscribe((lancamentoAdicionado: LancamentoDTO) => {
      this.toastyService.success({
        title: 'Adicionado',
        timeout: 1500,
        msg: 'Lançamento adicionado com sucesso!',
      });
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    },
    (erro: any) => this.handlerService.handle(erro)
    );
  }

  atualizarLancamento(): void {
    this.lancamentoService.atualizar(this.formulario.value)
        .subscribe((lanc: LancamentoDTO) => {
        this.lancamento = lanc;
        this.toastyService.success({
          title: 'Alteração',
          timeout: 1500,
          msg: 'Lançamento alterado com sucesso!',
        });
        this.atualizarTitulo(lanc);
    },
    (erro: any) => this.handlerService.handle(erro)
    );
  }

  carregarCategorias() {
    return this.categoriasService.listarTodas().subscribe(
      (categorias) => {
        this.categorias = categorias.map((c) => ({
          label: c.nome,
          value: c.codigo,
        }));
      },
      (erro: any) => this.handlerService.handle(erro)
    );
  }

  carregarPessoas() {
    return this.pessoasService.listarTodas().subscribe(
      (pessoas) => {
        this.pessoas = pessoas.content.map((c) => ({
          label: c.nome,
          value: c.codigo,
        }));
      },
      (erro: any) => this.handlerService.handle(erro)
    );
  }

  novo(): void {
    this.formulario.reset();
    this.formulario.get('tipo').setValue('RECEITA');
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTitulo(lancamento: LancamentoDTO): void {
    this.title.setTitle(`Edição de Lançamento: ${lancamento.descricao}`);
  }
}
