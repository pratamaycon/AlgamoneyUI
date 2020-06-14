import { RelatoriosService } from './../services/relatorios.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    periodoInicio: new FormControl(null, [Validators.required]),
    periodoFim: new FormControl(null, [Validators.required]),
  });

  constructor(private relatoriosService: RelatoriosService) { }

  ngOnInit(): void {
  }

  gerar() {
    this.relatoriosService.relatorioLancamentosPorPessoa(
      this.formulario.value.periodoInicio,
      this.formulario.value.periodoFim
      ).subscribe(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }

}
