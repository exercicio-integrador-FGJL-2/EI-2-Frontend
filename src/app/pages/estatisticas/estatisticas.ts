import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LaboratorioService } from '../../services/laboratorio.service';
import { NotebookService } from '../../services/notebook.service';
import { SalaService } from '../../services/sala.service';
import { HttpClientModule } from '@angular/common/http';
import { Notebook } from '../../models/notebook';
import { Laboratorio } from '../../models/laboratorio';
import { Sala } from '../../models/sala';
import { RecursofuncionarioService } from '../../services/recursofuncionario.service';
import { RecursoFuncionario } from '../../models/recursoFuncionario';

interface Data {
  name: String,
  value: number
}

enum DiaSemana {
  Segunda = 1,
  Terca = 2,
  Quarta = 3,
  Quinta = 4,
  Sexta = 5,
}

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './estatisticas.html',
  styleUrls: ['./estatisticas.css'],
})
export class EstatisticasComponent {
  view: [number, number] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  moreFrequent = '#E9C46A';
  lessFrequent = '#2A9D8F';

  notebooks: RecursoFuncionario[] = [];
  laboratorios: RecursoFuncionario[] = [];
  salas: RecursoFuncionario[] = [];
  resources = new Set<Data>();
  dias = new Set<Data>();

  constructor(
    private recursoFuncionarioService: RecursofuncionarioService
  ) { }

  // 0 = sala /  1 = lab / 2 = note

  ngOnInit(): void {

    // req

    this.recursoFuncionarioService.getRecursosFuncionarios().subscribe((data) => {
      data.forEach(d => {
        switch (d.TipoRecurso) {
          case 0:
            this.salas.push(d);
            break;
          case 1:
            this.laboratorios.push(d);
            break;
          case 2:
            this.notebooks.push(d);
            break;
        }
      });
    })

    this.salas.forEach(_ => {
      this.resources.has({ name: 'Sala', value: 0 }) ? this.resources.forEach(resource => {
        if (resource.name === 'Sala') {
          resource.value += 1;
        }
      }) : this.resources.add({ name: 'Sala', value: 1 })
    });

    this.laboratorios.forEach(_ => {
      this.resources.has({ name: 'Laboratorio', value: 0 }) ? this.resources.forEach(resource => {
        if (resource.name === 'Laboratorio') {
          resource.value += 1;
        }
      }) : this.resources.add({ name: 'Laboratorio', value: 1 })
    });

    this.notebooks.forEach(_ => {
      this.resources.has({ name: 'Notebook', value: 0 }) ? this.resources.forEach(resource => {
        if (resource.name === 'Notebook') {
          resource.value += 1;
        }
      }) : this.resources.add({ name: 'Notebook', value: 1 })
    });


    


  }




}


