import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  public lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params: any = {};
    params.inicio = moment(inicio).format('YYYY-MM-DD');
    params.fim = moment(fim).format('YYYY-MM-DD');
    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
    {  params, responseType: 'blob'})
  }

}
