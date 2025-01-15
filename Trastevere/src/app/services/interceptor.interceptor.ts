import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let cloneReq = req.clone({
    withCredentials: true,
    headers: req.headers
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json'),
  });
  return next(cloneReq).pipe(
    catchError((error) => throwError(() => gestionarError(error)))
  );
};

const errors400 = (error: HttpErrorResponse) => {
  return error;
};
export const gestionarError = (error: any) => {
  const errorToReturn: { [key: string]: any } = { ...error };
  if (error.status >= 400 && error.status < 500)
    return errors400(errorToReturn as HttpErrorResponse);

  return errorToReturn;
};
