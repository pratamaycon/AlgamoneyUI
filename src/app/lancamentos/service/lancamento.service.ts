
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  public lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

  resumir(): Observable<any> {
    const headers = new HttpHeaders()
    .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers } );
  }
}
