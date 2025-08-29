import { Injectable, signal } from '@angular/core';
import { Funcionario } from '../models/funcionario';


@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly KEY = 'ei2:user';
  user = signal<Funcionario | null>(this.load());

  private load(): Funcionario | null {
    const raw = localStorage.getItem(this.KEY);
    try { return raw ? JSON.parse(raw) as Funcionario : null; } catch { return null; }
  }
  login(f: Funcionario) {
    this.user.set(f);
    localStorage.setItem(this.KEY, JSON.stringify(f));
  }
  logout() {
    this.user.set(null);
    localStorage.removeItem(this.KEY);
  }
}
