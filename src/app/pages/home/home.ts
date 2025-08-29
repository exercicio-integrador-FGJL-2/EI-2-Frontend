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
import { SessionService} from '../../core/session.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario';

type HomeForm = {
  usuarioId: FormControl<number | null>;
  nome: FormControl<string>;
  matricula: FormControl<number>;
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
  funcionarios: Funcionario[] = []

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private session: SessionService,
    private funcionarioService : FuncionarioService
  ) {}

  ngOnInit(): void {
    // se já existe usuário logado, vai direto pro gerenciamento
    if (this.session.user()) this.router.navigate(['/gerenciamento']);

    this.form = this.fb.group<HomeForm>({
      usuarioId: this.fb.control<number | null>(null, { validators: [Validators.required] }),
      nome:       this.fb.control(''),
      matricula:  this.fb.control(0),
      cargo:      this.fb.control(''),
    });
    
    this.funcionarioService.getFuncionarios().subscribe(f =>{
        this.funcionarios = f;
    })


    this.form.controls.usuarioId.valueChanges.subscribe(matricula => {
      const u = this.funcionarios.find(x => x.matricula === matricula) ?? null;
      this.form.patchValue({
        nome:       u?.nome ?? '',
        matricula:  u?.matricula ?? 0,
        cargo:      u?.cargo ?? '',
      });
    });
  }

  get f() { return this.form.controls; }

  confirmar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const u = this.funcionarios.find(x => x.matricula === this.f.matricula.value!)!;
    this.session.login(u);                  // salva na sessão/localStorage
    this.router.navigate(['/gerenciamento']);   // vai para o menu
  }
}
