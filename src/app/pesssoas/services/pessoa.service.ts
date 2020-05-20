import { PessoaDTO } from 'src/app/core/models/pessoa.dto';
import { PessoaFiltro } from './../PessoaFiltro';
import { environment } from './../../../environments/environment';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  public pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  listarTodas(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.pessoasUrl, { headers }).pipe(take(1));
  }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    const headers = this.getHeaders();
    const params: any = {};

    params.page = filtro.pagina;
    params.size = filtro.itensPorPagina;

    if (filtro.nome) {
      params.nome = filtro.nome;
    }

    return this.http.get(this.pessoasUrl, { headers, params }).pipe(
      map((res: any) => {
        const responseJson: any = res;
        const pessoas: any = responseJson.content;

        const resultado: any = {
          pessoas,
          total: responseJson.totalElements,
        };
        take(1);

        return resultado;
      })
    );
  }

   excluir(codigo: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers }).pipe(take(1));
  }

   ativarPropriedade(codigo: number, atvo: boolean): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, atvo, { headers }).pipe(take(1));
  }

   adicionar(pessoa: PessoaDTO): Observable<PessoaDTO> {
    const headers = this.getHeaders();

    const body = JSON.stringify(pessoa);

    return this.http.post(this.pessoasUrl, body, { headers }).pipe(
      map( (res: any) => {
        return res;
      }),
      take(1)
    );
  }

  atualizar(pessoa: PessoaDTO): Observable<PessoaDTO> {
    const headers = this.getHeaders();

    const body = JSON.stringify(pessoa);

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, body , { headers })
      .pipe(
        map((res: any) => {
          return res;
        }),
        take(1)
      );
  }

  buscarPorCodigo(codigo: number): Observable<PessoaDTO> {
    const headers = this.getHeaders();

    return this.http.get(`${this.pessoasUrl}/${codigo}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        }),
        take(1)
      );
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }
}
