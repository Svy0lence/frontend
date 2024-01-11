import { Component,  } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-mat-eliminar-categorias',
  templateUrl: './mat-eliminar-categorias.component.html',
  styleUrls: ['./mat-eliminar-categorias.component.scss']
})
export class MatEliminarCategoriasComponent {

  constructor(private dialogRef: MatDialogRef<MatEliminarCategoriasComponent>
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
