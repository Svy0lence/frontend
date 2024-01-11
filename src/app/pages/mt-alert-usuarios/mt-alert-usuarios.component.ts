import { Component } from '@angular/core';
import { User } from 'src/app/models/interfaces/user.interface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mt-alert-usuarios',
  templateUrl: './mt-alert-usuarios.component.html',
  styleUrls: ['./mt-alert-usuarios.component.scss']
})
export class MtAlertUsuariosComponent {

  constructor( private dialogRef: MatDialogRef<MtAlertUsuariosComponent>
  ){}

  confirmarEliminacion() {
    const resultado = true;

    this.dialogRef.close(resultado);
  }

  cancelarEliminacion() {
    const resultado = false;

    this.dialogRef.close(resultado);
  }
}
