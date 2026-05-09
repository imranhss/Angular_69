import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserModel } from '../model/users.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authUrl: string = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient
  ) { }


  // Get Request
  getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.authUrl);
  }


  // Post Request
  save(user: UserModel) {
    return this.http.post<UserModel>(this.authUrl, user);
  }

  // delete request
  delete(id: string): Observable<void> {

    return this.http.delete<void>(this.authUrl + '/' + id)

  }


  getById(id: string): Observable<UserModel> {

    return this.http.get<UserModel>(this.authUrl + '/' + id);

  }


  getUserByEmail(email: string): Observable<UserModel[]> {

    return this.http.get<UserModel[]>(`${this.authUrl}?email=${email}`);

  }




}
