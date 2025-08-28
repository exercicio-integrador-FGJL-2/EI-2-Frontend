import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../models/sala';

@Injectable({ providedIn: 'root' })
export class SalaService {
  private url = 'http://localhost:5228/api/sala';

  constructor(private http: HttpClient) {}

  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.url);
  }

  getSalaById(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.url}/${id}`);
  }

  updateSala(id: number, req: Sala): Observable<Sala> {
    return this.http.put<Sala>(`${this.url}/${id}`, req);
  }
}