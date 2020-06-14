import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public lancamentosdUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosdUrl = `${environment.apiUrl}/lancamentos`;
   }

   lancamentosPorCategoria(): Observable<any> {
    return this.http.get(`${this.lancamentosdUrl}/estatisticas/por-categoria`)
   }

   lancamentosPorDia(): Observable<any> {
    return this.http.get(`${this.lancamentosdUrl}/estatisticas/por-dia`).pipe(
      map((res: any) => {
        const dados = res;
        this.converterStringParaDatas(dados)

        return dados;
      })
    )
   }

   private converterStringParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
   }
}
