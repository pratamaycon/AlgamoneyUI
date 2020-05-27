import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private toastyService: ToastyService) {}

  handle(errorResponse: HttpErrorResponse) {
    let titulo: string;
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse.status >= 400 && errorResponse.status < 500) {
      titulo = 'Erro no Cliente';
      msg =
        errorResponse.error[0]?.mensagemUsuario !== undefined
          ? errorResponse.error[0]?.mensagemUsuario
          : errorResponse.error.message;

      if (
        errorResponse.error.message === undefined &&
        errorResponse.error[0]?.mensagemUsuario === undefined
      ) {
        msg = errorResponse.error.error;
      }
    } else {
      msg = 'Erro ao processar serviço remoto. Tente Novamente';
    }

    this.toastyService.error({ title: titulo, timeout: 1400, msg });
  }
}
