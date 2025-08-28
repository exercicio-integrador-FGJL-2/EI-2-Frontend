import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from '../models/notebook';

@Injectable({ providedIn: 'root' })
export class NotebookService {
  private url = 'http://localhost:5228/api/notebooks';

  constructor(private http: HttpClient) {}

  getNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.url);
  }

  getNotebookById(id: number): Observable<Notebook> {
    return this.http.get<Notebook>(`${this.url}/${id}`);
  }

  updateNotebook(id: number, req: Notebook): Observable<Notebook> {
    return this.http.put<Notebook>(`${this.url}/${id}`, req);
  }

  addNotebook(req: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(`${this.url}`, req);
  }

  deleteNotebook(id: number): Observable<Notebook> {
    return this.http.delete<Notebook>(`${this.url}/${id}`);
  }
}