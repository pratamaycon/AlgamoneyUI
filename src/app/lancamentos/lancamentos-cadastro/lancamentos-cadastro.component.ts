import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LancamentoService } from './../service/lancamento.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pesssoas/services/pessoa.service';

import { SelectItem } from 'primeng/api/selectitem';
import { ToastyService } from 'ng2-toasty';
import { CategoriaDTO } from 'src/app/core/categoria.dto';
import { PessoaDTO } from 'src/app/core/pessoa.dto';
import { LancamentoDTO } from 'src/app/core/lancamento.dto';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss'],
})
export class LancamentosCadastroComponent implements OnInit {
  public formulario: FormGroup = new FormGroup({
    vencimento: new FormControl(null, [Validators.required]),
    pagamento: new FormControl(null),
    descricao: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    valor: new FormControl(null, [Validators.required]),
    categoria: new FormControl(null, [Validators.required]),
    pessoa: new FormControl(null, [Validators.required]),
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
    private toastyService: ToastyService
  ) {}

  ngOnInit(): void {
    this.configurarFormulario();
    this.carregarCategorias();
    this.carregarPessoas();
  }

  private configurarFormulario(): LancamentoDTO {
    this.lancamento = new LancamentoDTO(
      this.formulario.controls.tipo.value,
      this.formulario.controls.valor.value,
      this.formulario.controls.descricao.value,
      this.formulario.controls.vencimento.value,
      this.formulario.controls.pagamento.value,
      new PessoaDTO(this.formulario.controls.pessoa.value),
      new CategoriaDTO(this.formulario.controls.categoria.value),
      this.formulario.controls.observacao.value
    );
    return this.lancamento;
  }

  salvar() {
    const lancamento = this.configurarFormulario();
    this.lancamentoService.adicionar(lancamento).subscribe((_) => {
      this.toastyService.success({
        title: 'Adicionado',
        timeout: 1500,
        msg: 'Lançamento adicionado com sucesso!',
      });
      this.formulario.reset();
      this.formulario.get('tipo').setValue('RECEITA');
      this.lancamento = null;
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
}
