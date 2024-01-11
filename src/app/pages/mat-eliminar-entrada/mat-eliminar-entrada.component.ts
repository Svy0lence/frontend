import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-eliminar-entrada',
  templateUrl: './mat-eliminar-entrada.component.html',
  styleUrls: ['./mat-eliminar-entrada.component.scss']
})
export class MatEliminarEntradaComponent {
  constructor(
    private dialogRef: MatDialogRef<MatEliminarEntradaComponent>
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
