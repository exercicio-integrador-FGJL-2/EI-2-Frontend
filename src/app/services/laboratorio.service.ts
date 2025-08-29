import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratorio } from '../models/laboratorio';

@Injectable({ providedIn: 'root' })
export class LaboratorioService {
  private url = 'http://localhost:5228/api/Laboratorio';

  constructor(private http: HttpClient) {}

  getLaboratorios(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.url);
  }

  getLaboratorioById(id: number): Observable<Laboratorio> {
    return this.http.get<Laboratorio>(`${this.url}/${id}`); //http://localhost:5228/api/Laboratorio/id
  }

  updateLaboratorio(id: number, req: Laboratorio): Observable<Laboratorio> {
    return this.http.put<Laboratorio>(`${this.url}/${id}`, req);
  }
}