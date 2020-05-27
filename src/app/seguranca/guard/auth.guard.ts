import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/seguranca/service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const roles = next.data.roles;
    if (this.authService.isAccessTokenInvalido()){
      return this.authService.obterNovoAccessToken()
      .pipe(
        map( _ => {
          return true;
        })
      )
    } else if (roles && !this.authService.temQualquerPermissao(roles)) {
      this.router.navigate(['/nao-autorizado'])
      return false;
    }

    return true;
  }

}
