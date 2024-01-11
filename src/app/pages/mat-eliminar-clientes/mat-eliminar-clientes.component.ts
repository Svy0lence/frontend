import { Component } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-eliminar-clientes',
  templateUrl: './mat-eliminar-clientes.component.html',
  styleUrls: ['./mat-eliminar-clientes.component.scss']
})
export class MatEliminarClientesComponent {

  constructor(private dialogRef: MatDialogRef<MatEliminarClientesComponent>
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
