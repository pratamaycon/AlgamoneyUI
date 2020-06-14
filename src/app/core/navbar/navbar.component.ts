import { LogoutService } from './../../seguranca/services/logout.service';
import { AuthService } from './../../seguranca/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../service/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public expandirMenu = false;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private hanlderService: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  exibeMenu() {
    this.expandirMenu = !this.expandirMenu;
  }

  logout() {
    this.logoutService.logout().subscribe((_) => {
      this.router.navigate(['/login'])
    },
    ((erro: any) => this.hanlderService.handle(erro))
    )
  }

}
