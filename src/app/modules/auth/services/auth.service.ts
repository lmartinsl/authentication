import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = 'http://localhost:3000/auth';
  private subjectUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjectLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user)
  }

  public login(credentials: { email: string, password: string }): Observable<User> {
    return this.http
      .post<User>(`${this.url}/login`, credentials)
      .pipe(
        tap((user: User) => {
          localStorage.setItem('token', user.token)
          this.subjectLoggedIn$.next(true)
          this.subjectUser$.next(user)
        })
      )
  }

  public isAuthenticated(): Observable<boolean> {
    return this.subjectLoggedIn$.asObservable()
  }

  public getUser(): Observable<User> {
    return this.subjectUser$.asObservable()
  }

  public logout(): void {
    localStorage.removeItem('token')
    this.subjectLoggedIn$.next(false)
    this.subjectUser$.next(null)
    this
  }
}
