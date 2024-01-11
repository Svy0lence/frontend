import { Component  } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-mat-eliminar-departamentos',
  templateUrl: './mat-eliminar-departamentos.component.html',
  styleUrls: ['./mat-eliminar-departamentos.component.scss']
})
export class MatEliminarDepartamentosComponent {

  constructor(
    private dialogRef: MatDialogRef<MatEliminarDepartamentosComponent>
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
