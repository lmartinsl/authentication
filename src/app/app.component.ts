import { Router } from '@angular/router';
import { User } from './interfaces/user';
import { Observable } from 'rxjs';
import { AuthService } from './modules/auth/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public authenticated$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getUser();
  }

  public logout() {
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')
  }

}
