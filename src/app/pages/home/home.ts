import { Component } from '@angular/core';
import { Agendamento } from "../../components/agendamento/agendamento";

@Component({
  selector: 'app-home',
  imports: [Agendamento],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
