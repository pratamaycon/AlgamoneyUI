import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/seguranca/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  public tokenRevokeUrl: string;

  constructor(private http: HttpClient, private AuthService: AuthService) {
    this.tokenRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokenRevokeUrl, { withCredentials: true })
      .pipe(
        map((_) => {
          this.AuthService.limparAccessToken()
        })
      );
  }
}
