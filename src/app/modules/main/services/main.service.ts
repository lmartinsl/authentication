import { Person } from './../../../interfaces/person';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly url: string = 'http://localhost:3000/api'

  constructor(
    private http: HttpClient
  ) { }

  public getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/people`)
      .pipe(
        tap((p) => console.log(p)),
        catchError((err) => {
          console.error(err)
          return throwError(err)
        })
      )
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`)
      .pipe(
        tap((p) => console.log(p)),
        catchError((err) => {
          console.error(err)
          return throwError(err)
        })
      )
  }
}
