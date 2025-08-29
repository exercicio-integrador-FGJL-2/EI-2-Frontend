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

  notebooks: Notebook[] = [];
  laboratorios: Laboratorio[] = [];
  salas: Sala[] = [];
  resources = new Set<Data>();
  dias = new Set<Data>();

  constructor(
    private 
  ) { }


  ngOnInit(): void {

    // req

    this.notebookService.getNotebooks().subscribe((data) => {
      this.notebooks = data;
    });

    this.labService.getLaboratorios().subscribe((data) => {
      this.laboratorios = data;
    });

    this.salaService.getSalas().subscribe((data) => {
      this.salas = data;
    }
    );

    this.salas.forEach(sala => {
      this.resources.has({ name: 'Sala', value: 0 }) ? this.resources.forEach(resource => {
        if (resource.name === 'Sala') {
          resource.value += 1;
        }
      }) : this.resources.add({ name: 'Sala', value: 1 })
    });

    this.laboratorios.forEach(laboratorio => {
      this.resources.has({ name: 'Laboratorio', value: 0 }) ? this.resources.forEach(resource => {
        if (resource.name === 'Laboratorio') {
          resource.value += 1;
        }
      }) : this.resources.add({ name: 'Laboratorio', value: 1 })
    });

    this.notebooks.forEach(notebook => {
      this.resources.has({ name: 'Notebook', value: 0 }) ? this.resources.forEach(resource => {
        if (resource.name === 'Notebook') {
          resource.value += 1;
        }
      }) : this.resources.add({ name: 'Notebook', value: 1 })
    });

    this.notebooks.forEach(notebook => {
      const dia = new Date(notebook.data);
      const diaSemana = dia.getDay();


  }



customColors = [
  { name: 'Notebook', value:  },
  { name: 'Sala', value: '#F4A261' },
  { name: 'Laboratório', value: '#E76F51' },


  { name: 'Segunda-Feira', value: '#E9C46A' },
  { name: 'Quarta-Feira', value: '#2A9D8F' },
]

}


