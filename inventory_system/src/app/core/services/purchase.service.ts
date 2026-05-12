import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Purchase } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {

  private apiUrl = `${environment.apiUrl}purchases`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.apiUrl);
  }

  create(data: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.apiUrl, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}