import { Injectable, signal } from '@angular/core';

export type Usuario = { id: number; nome: string; matricula: string; cargo: string };

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly KEY = 'ei2:user';
  user = signal<Usuario | null>(this.load());

  private load(): Usuario | null {
    const raw = localStorage.getItem(this.KEY);
    try { return raw ? JSON.parse(raw) as Usuario : null; } catch { return null; }
  }
  login(u: Usuario) {
    this.user.set(u);
    localStorage.setItem(this.KEY, JSON.stringify(u));
  }
  logout() {
    this.user.set(null);
    localStorage.removeItem(this.KEY);
  }
}
