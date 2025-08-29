import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private url = 'http://localhost:5228/api/Funcionario/all';

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.url);
  }

}
