import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecursoFuncionario } from '../models/recursoFuncionario';

@Injectable({
  providedIn: 'root'
})
export class RecursofuncionarioService {
  private url = 'http://localhost:5228/api/sala';

  constructor(private http: HttpClient) {}

  getRecursosFuncionarios(): Observable<RecursoFuncionario[]> {
    return this.http.get<RecursoFuncionario[]>(this.url);
  }
}
