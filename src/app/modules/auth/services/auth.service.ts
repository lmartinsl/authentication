import { Observable } from 'rxjs';
import { User } from './../../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = 'http://localhost:3000/auth'

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user)
  }
}
