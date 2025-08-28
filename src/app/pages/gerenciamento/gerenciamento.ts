import { Component, computed, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
export class GerenciamentoComponent {
  // aba ativa
  tab = signal<Recurso>('salas');

  // mock de dados (trocar pela API) ***AJUDA
  private hoje = new Date();

  private mk = (id: string, usuario: string, dias: number): Item => {
    const d = new Date(this.hoje);
    d.setDate(this.hoje.getDate() + dias);
    let status: Status = 'present';
    if (dias < 0) status = 'past';
    if (dias > 0) status = 'future';
    return { id, usuario, data: d, status };
  };

  data: Record<Recurso, Item[]> = {
    salas: [
      this.mk('12345678', 'Fulano de Tal', -1),
      this.mk('12345679', 'Beltrano',      -3),
      this.mk('12345680', 'Ciclano',        0),
      this.mk('12345681', 'Maria Lima',     2),
      this.mk('12345682', 'Joana',          5),
      this.mk('12345683', 'Carlos',         8),
      this.mk('12345684', 'Sofia',         14),
    ],
    laboratorios: [
      this.mk('Lab 01', 'Equipe A',  0),
      this.mk('Lab 02', 'Equipe B', -2),
      this.mk('Lab 03', 'Equipe C',  6),
      this.mk('Lab 04', 'Equipe D', 12),
    ],
    notebooks: [
      this.mk('NTB-001', 'Leo',   -1),
      this.mk('NTB-002', 'Ana',    0),
      this.mk('NTB-003', 'Rafa',   4),
      this.mk('NTB-004', 'Lia',    9),
    ],
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
