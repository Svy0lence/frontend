import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-eliminar',
  templateUrl: './mat-eliminar.component.html',
  styleUrls: ['./mat-eliminar.component.scss']
})

export class MatEliminarComponent {
  constructor(
    private dialogRef: MatDialogRef<MatEliminarComponent>
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
