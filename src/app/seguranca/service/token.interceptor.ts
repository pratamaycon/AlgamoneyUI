import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = this.authService.getToken();
    const headers = {}

    if (idToken) {

      if (!request.headers.has('Content-Type')) {
        headers['Content-Type'] = 'application/json';
      }

      if (!this.authService.isAccessTokenInvalido()){
        headers['Authorization'] = `Bearer ${idToken}`
      }

      const cloned = request.clone({
        setHeaders: headers
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
