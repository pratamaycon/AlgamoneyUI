import { PessoaFiltro } from './../PessoaFiltro';
import { environment } from './../../../environments/environment';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  public pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  listarTodas(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get(this.pessoasUrl, { headers });
  }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    const headers = this.setHeaders();
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

        return resultado;
      })
    );
  }

  private setHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }
}
