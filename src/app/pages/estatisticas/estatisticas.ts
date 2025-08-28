import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LaboratorioService } from '../../services/laboratorio.service';
import { NotebookService } from '../../services/notebook.service';
import { SalaService } from '../../services/sala.service';
import { HttpClientModule } from '@angular/common/http';

interface Data {
  name: String,
  value: number
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

  constructor(
    private labService: LaboratorioService,
    private notebookService: NotebookService,
    private salaService: SalaService
  ){}

  dias: Data[] = [
    {
      "name": "Segunda-Feira",
      "value": 13
    },
    {
      "name": "Terça-Feira",
      "value": 2
    },
    {
      "name": "Quarta-Feira",
      "value": 5
    },
    {
      "name": "Quinta-Feira",
      "value": 17
    },
    {
      "name": "Sexta-Feira",
      "value": 8
    }
  ];

  resources: Data[] = [
    {
      "name": "Notebook",
      "value": 25
    },
    {
      "name": "Laboratório",
      "value": 13
    },
    {
      "name": "Sala",
      "value": 7
    }
  ];


}


