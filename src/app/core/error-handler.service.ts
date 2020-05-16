import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService ) { }

  handle(errorResponse: HttpErrorResponse) {
    let msg: string;

    if (errorResponse.status >= 400 && errorResponse.status <= 500) {

      msg = errorResponse.error[0]?.mensagemUsuario !== undefined ?
      errorResponse.error[0]?.mensagemUsuario :
      errorResponse.error.message;

    } else {
      msg = 'Erro ao processar serviço remoto. Tente Novamente';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.toastyService.error({title: 'Erro no Cliente', timeout: 1400, msg});
  }
}
