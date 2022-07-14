import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      const authReq = req.clone({
        setHeaders: {
          Authorization: token
        }
      })
      return next.handle(authReq)
        .pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.authService.logout();
                this.router.navigateByUrl('/auth/login');
              }
            }
            return throwError(err)
          })
        )
    }
    return next.handle(req)
  }
}
