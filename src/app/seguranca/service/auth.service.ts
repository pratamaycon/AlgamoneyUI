import { JwtHelperService } from '@auth0/angular-jwt';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public oauthTokenUrl: string;
  public jwtPayload: any;

  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    console.log(this.cachedRequests);
  }

  autenticacao(usuario: string, senha: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true }).pipe(
      map((res: any) => {
        this.armazenarToken(res.access_token);
      }),
      catchError((response) => {
        if (response.status) {
          const responseJson = response;

          if (responseJson.error.error === 'invalid_grant') {
            return throwError('Usuário ou senha Inválida');
          }
        }
        return response;
      })
    );
  }

  obterNovoAcessToken(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true }).pipe(
      map((res: any) => {
        this.armazenarToken(res.access_token);
        console.log('Novo Acess Token Criado');
      }),
      catchError((res: any) => {
        return throwError(res);
      })
    );
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
