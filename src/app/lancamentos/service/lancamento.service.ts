import { LancamentoFilter } from '../LancamentoFilter';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  public lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFilter): Observable<any> {
    const params: any = {};
    const headers = this.setHeaders();

    params.page = filtro.pagina;
    params.size = filtro.itensPorPagina;

    if (filtro.descricao) {
      params.descricao = filtro.descricao;
    }

    if (filtro.dataVencimentoInicio) {
      params.dataVencimentoDe = moment(filtro.dataVencimentoInicio).format(
        'YYYY-MM-DD'
      );
    }

    if (filtro.dataVencimentoFim) {
      params.dataVencimentoAte = moment(filtro.dataVencimentoFim).format(
        'YYYY-MM-DD'
      );
    }

    return this.http
      .get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .pipe(
        map((res: any) => {
          const reponseJson: any = res;
          const lancamentos: any = reponseJson.content;

          const resultado: any = {
            lancamentos,
            total: reponseJson.totalElements,
          };

          return resultado;
        })
      );
  }

  excluir(codigo: number): Observable<any> {
    const headers = this.setHeaders();
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers });
  }

    private setHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }
}
