import { Injectable } from '@angular/core';
import { User, USERS } from './user';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // getUsers(): User[]{
  //   return USERS;
  // }

  // getUser(id: number): User{
  //   return USERS.find(user => user.id===id);
  // }


  private UsersUrl = "http://localhost:3000/users";



  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.UsersUrl);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.UsersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getuser id=${id}`))
    );
  }

  updateUser (user: User): Observable<any> {
    const url = `${this.UsersUrl}/${user.id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => console.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('update user'))
    );
  }


  // addUser (user: User): Observable<User> {
  //   return this.http.post<User>(this.UsersUrl, user, this.httpOptions).pipe(
  //     tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`)),
  //     catchError(this.handleError<User>('addUser'))
  //   );
  // }
  addUser (_user:{name: string, major: string}): Observable<User> {
    return this.http.post<User>(this.UsersUrl, _user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }


  deleteUser (user: User): Observable<User> {
    const url = `${this.UsersUrl}/${user.id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${user.id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http:HttpClient) { }
}
