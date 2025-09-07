import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, of, switchMap, throwError } from "rxjs";

let isRefreshing = false;

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        !isRefreshing &&
        !req.url.includes('logout') &&
        !req.url.includes('refresh-token')
      ) {
        isRefreshing = true;

        return authService.refreshToken().pipe(
          switchMap(() => {
            isRefreshing = false

            return next(req);
          }),
        )
      }

      return throwError(()=> of(null));
    })
  );
};
