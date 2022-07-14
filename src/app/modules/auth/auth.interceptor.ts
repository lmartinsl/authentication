import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      const authReq = req.clone({
        setHeaders: {
          Authorization: token
        }
      })
      return next.handle(authReq)
    }
    return next.handle(req)
  }
}
