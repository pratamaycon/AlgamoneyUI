import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';

import { LancamentoDTO } from '../../core/models/lancamento.dto';
import { LancamentoFilter } from '../LancamentoFilter';

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
    const headers = this.getHeaders();

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
        map((lanc: any) => {
          const reponseJson: any = lanc;
          const lancamentos: any = reponseJson.content;

          const resultado: any = {
            lancamentos,
            total: reponseJson.totalElements,
          };

          return resultado;
        }),
        take(1)
      );
  }

  excluir(codigo: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .pipe(take(1));
  }

  adicionar(lancamento: LancamentoDTO): Observable<LancamentoDTO> {
    const headers = this.getHeaders();

    const body = JSON.stringify(lancamento);

    return this.http.post(this.lancamentosUrl, body, { headers }).pipe(
      map((lanc: any) => {
        return lanc;
      }, take(1))
    );
  }

  atualizar(lancamento: LancamentoDTO): Observable<LancamentoDTO> {
    const headers = this.getHeaders();

    const body = JSON.stringify(lancamento);
    return this.http
      .put(`${this.lancamentosUrl}/${lancamento.codigo}`, body, { headers })
      .pipe(
        map((res: any) => {
          const lanc = res as LancamentoDTO;
          this.converterStringParaDatas([lanc]);
          return lanc;
        }, take(1))
      );
  }

  buscarPorCodigo(codigo: number): Observable<LancamentoDTO> {
    const headers = this.getHeaders();
    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers }).pipe(
      map((res: any) => {
        const lanc = res as LancamentoDTO;
        this.converterStringParaDatas([lanc]);
        return lanc;
      }, take(1))
    );
  }

  private converterStringParaDatas(lancamentos: LancamentoDTO[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(
        lancamento.dataVencimento,
        'YYYY-MM-DD'
      ).toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(
          lancamento.dataPagamento,
          'YYYY-MM-DD'
        ).toDate();
      }
    }
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }
}
