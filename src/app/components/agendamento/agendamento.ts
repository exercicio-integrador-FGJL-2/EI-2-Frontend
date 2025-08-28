import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

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

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  labSelection() {
    this.labStatus.set(!this.labStatus());
    if (!this.labStatus()) this.selectedLab.set('');
  }

  clearLabValue() {
    if (!this.labStatus()) this.selectedLab.set('');
  }

  notebookSelection() {
    this.notebookStatus.set(!this.notebookStatus());
    if (!this.notebookStatus()) this.selectedNotebook.set('');
  }

  roomSelection() {
    this.roomStatus.set(!this.roomStatus());
    if (!this.roomStatus()) this.selectedRoom.set('');
  }

  
  verifyLabStatus() {
    if (!this.notebookStatus() && !this.roomStatus()) {
      this.labStatus.set(true);
    } else {
      this.labStatus.set(false);
    }
  }
}
