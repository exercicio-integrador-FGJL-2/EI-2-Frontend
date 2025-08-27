import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder, FormGroup, FormControl,
  Validators, ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SessionService, Usuario } from '../../core/session.service';

type HomeForm = {
  usuarioId: FormControl<number | null>;
  nome: FormControl<string>;
  matricula: FormControl<string>;
  cargo: FormControl<string>;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup<HomeForm>;

  // Mock — troque por API quando quiser
  usuarios: Usuario[] = [
    { id: 1, nome: 'Leonardo Souza', matricula: '0001', cargo: 'Professor'   },
    { id: 2, nome: 'Rafael Pereira', matricula: '0002', cargo: 'Técnico'     },
    { id: 3, nome: 'Pedro Magralhães', matricula: '0003', cargo: 'Coordenador' },
    { id: 4, nome: 'Roberto Carneiro', matricula: '0004', cargo: 'Estagiário'  },
    { id: 5, nome: 'Mauricio Costa', matricula: '0005', cargo: 'Professor'   },
    { id: 6, nome: 'Fabricio SIlva', matricula: '0006', cargo: 'Técnico'     },
    { id: 7, nome: 'Fernando Meireles', matricula: '0007', cargo: 'Coordenador'},
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    // se já existe usuário logado, vai direto pro dashboard
    if (this.session.user()) this.router.navigate(['/dashboard']);

    this.form = this.fb.group<HomeForm>({
      usuarioId: this.fb.control<number | null>(null, { validators: [Validators.required] }),
      nome:       this.fb.control(''),
      matricula:  this.fb.control(''),
      cargo:      this.fb.control(''),
    });

    this.form.controls.usuarioId.valueChanges.subscribe(id => {
      const u = this.usuarios.find(x => x.id === id) ?? null;
      this.form.patchValue({
        nome:       u?.nome ?? '',
        matricula:  u?.matricula ?? '',
        cargo:      u?.cargo ?? '',
      });
    });
  }

  get f() { return this.form.controls; }

  confirmar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const u = this.usuarios.find(x => x.id === this.f.usuarioId.value!)!;
    this.session.login(u);                  // salva na sessão/localStorage
    this.router.navigate(['/dashboard']);   // vai para o menu
  }
}
