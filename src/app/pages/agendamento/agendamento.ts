import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  standalone: true,                        
  providers: [provideNativeDateAdapter()],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterLink
],
  templateUrl: './agendamento.html',
  styleUrls: ['./agendamento.css'],         
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendamentoComponent {
  notebookStatus = signal(false);
  labStatus = signal(false);
  roomStatus = signal(false);

  selectedNotebook = signal('');
  selectedLab = signal('');
  selectedRoom = signal('');

  notebookCheckbox = signal(false);
  labCheckbox = signal(false);
  roomCheckbox = signal(false);

  readonly date = new FormControl(new Date())

  constructor() {
    this.date.valueChanges.subscribe((selectedDate) => {
      console.log('Selected date:', selectedDate);
    });
  }

  labSelection() {
    this.labStatus.set(!this.labStatus());

    if (!this.labStatus()) {
      this.selectedLab.set('');
      this.notebookCheckbox.set(false);
      this.roomCheckbox.set(false);
    } else {
      this.notebookCheckbox.set(true);
      this.roomCheckbox.set(true);
      this.notebookStatus.set(false);
      this.roomStatus.set(false);
      this.selectedNotebook.set('');
      this.selectedRoom.set('');
    }
  }

  notebookSelection() {
    this.notebookStatus.set(!this.notebookStatus());

    if (!this.notebookStatus()) {
      this.selectedNotebook.set('');
      if (!this.roomStatus()) {
        this.labCheckbox.set(false);
      }
    } else {
      this.labStatus.set(false);
      this.selectedLab.set('');
      this.labCheckbox.set(true);
    }
  }

  roomSelection() {
    this.roomStatus.set(!this.roomStatus());

    if (!this.roomStatus()) {
      this.selectedRoom.set('');
      if (!this.notebookStatus()) {
        this.labCheckbox.set(false);
      }
    } else {
      this.labStatus.set(false);
      this.selectedLab.set('');
      this.labCheckbox.set(true);
    }
  }

}