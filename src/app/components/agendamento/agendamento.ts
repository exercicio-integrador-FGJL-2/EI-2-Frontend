import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-agendamento',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './agendamento.html',
  styleUrl: './agendamento.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Agendamento {
  // 
  notebookStatus = signal(false);
  labStatus = signal(false);
  roomStatus = signal(false);

  selectedNotebook = signal('');
  selectedLab = signal('');
  selectedRoom = signal('');

  notebookCheckbox = signal(false);
  labCheckbox = signal(false);
  roomCheckbox = signal(false);

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  labSelection() {
    this.labStatus.set(!this.labStatus());

    if (this.labStatus() == false) {
      this.selectedLab.set('');
    } else {
      this.notebookStatus.set(false);
      this.roomStatus.set(false);
      this.selectedNotebook.set('');
      this.selectedRoom.set('');
    }
  }

  notebookSelection() {
    this.notebookStatus.set(!this.notebookStatus());

    if (this.notebookStatus() == false) {
      this.selectedNotebook.set('');
      this.labCheckbox.set(false);

    } else {
      this.labStatus.set(false);
      this.selectedLab.set('');
      this.labCheckbox.set(true);
    }
  }

  roomSelection() {
    this.roomStatus.set(!this.roomStatus());

    if (this.roomStatus() == false) {
      this.selectedRoom.set('');
      this.labCheckbox.set(false);
    } else {
      this.labStatus.set(false);
      this.selectedLab.set('');
      this.labCheckbox.set(true);
    }
  }

}
