import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './../../../interfaces/user';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { map, tap, catchError } from 'rxjs/operators';

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
    const token = localStorage.getItem('token')
    if (token && !this.subjectLoggedIn$.value) {
      return this.checkTokenValidation()
    }
    return this.subjectLoggedIn$.asObservable()
  }

  public checkTokenValidation(): Observable<boolean> {
    return this.http
      .get<User>(`${this.url}/user`)
      .pipe(
        tap((u: User) => {
          if (u) {
            localStorage.setItem('token', u.token);
            this.subjectLoggedIn$.next(true)
            this.subjectUser$.next(u)
          }
        }),
        map((u: User) => (u) ? true : false),
        catchError((err) => {
          this.logout()
          return of(false)
        })
      )
  }

  public getUser(): Observable<User> {
    return this.subjectUser$.asObservable()
  }

  public logout(): void {
    localStorage.removeItem('token')
    this.subjectLoggedIn$.next(false)
    this.subjectUser$.next(null)
  }
}
