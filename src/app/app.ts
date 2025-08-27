import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionService } from './core/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  readonly session = inject(SessionService);
  private readonly router = inject(Router);

  logout() {
    this.session.logout();
    this.router.navigateByUrl('/');   // volta para seleção de usuário
  }
}
