import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './../service/auth.service';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    nome:  new FormControl(null, [Validators.required]),
    senha: new FormControl(null, [Validators.required]),
  });

  constructor(
    public authService: AuthService,
    private handlerService: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  autenticar(): void {
    this.authService.autenticacao(
      this.formulario.controls.nome.value,
      this.formulario.controls.senha.value,
    ).subscribe((_) => {
      this.router.navigate(['/lancamentos']);
    },
    (erro: any) => {
      console.log(erro);
      this.handlerService.handle(erro);
    }
    );
  }

}
