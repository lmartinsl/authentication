import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  public canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated()
      .pipe(
        tap((b: boolean) => {
          if (!b) {
            this.router.navigateByUrl('/auth/login')
          }
        })
      )
  }
}
