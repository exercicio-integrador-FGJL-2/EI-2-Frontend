import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RecursoFuncionario } from '../../models/recursoFuncionario';
import { RecursofuncionarioService } from '../../services/recursofuncionario.service';

type Recurso = 'notebooks' | 'laboratorios' | 'salas';
type Status  = 'past' | 'present' | 'future';

interface Item {
  id: string;         
  usuario: string;
  data: Date;
  status: Status;
}

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  
  imports: [CommonModule, DatePipe],
  templateUrl: './gerenciamento.html',
  styleUrls: ['./gerenciamento.css'],
})
export class GerenciamentoComponent implements OnInit{
  // aba ativa
  tab = signal<Recurso>('salas');

  // mock de dados (trocar pela API) ***AJUDA
  private hoje = new Date();
  recursos : RecursoFuncionario[] = []

  constructor(private recursoFunService :RecursofuncionarioService){}
  

  private mk = (id: string, usuario: string, dias: number): Item => {
    const d = new Date(this.hoje);
    d.setDate(this.hoje.getDate() + dias);
    let status: Status = 'present';
    if (dias < 0) status = 'past';
    if (dias > 0) status = 'future';
    return { id, usuario, data: d, status };
  };


  // paginação
  pageSize = 6;
  page = signal(1);

  items = computed<Item[]>(() => this.data[this.tab()]);

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.items().length / this.pageSize))
  );

  pagedItems = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.items().slice(start, start + this.pageSize);
  });

 
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  idHeader = computed(() =>
  this.tab() === 'salas'
    ? 'N° SALA'
    : this.tab() === 'laboratorios'
      ? 'N° LABORATÓRIO'
      : 'N° NOTEBOOK' 
  );

  ngOnInit(): void {
  }


  setTab(t: Recurso) {
    if (this.tab() !== t) {
      this.tab.set(t);
      this.page.set(1);
    }
  }

  go(p: number) {
     if (p >= 1 && p <= this.totalPages()) this.page.set(p);
  }
  prev() { this.go(this.page() - 1); }
  next() { this.go(this.page() + 1); }

  label(status: Status) {
    return status === 'present' ? 'Presente'
         : status === 'future'  ? 'Futuro'
         : 'Passado';
  }

  
}
