import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-eliminar-unidad-medidas',
  templateUrl: './mat-eliminar-unidad-medidas.component.html',
  styleUrls: ['./mat-eliminar-unidad-medidas.component.scss']
})
export class MatEliminarUnidadMedidasComponent {

  constructor(private dialogRef: MatDialogRef<MatEliminarUnidadMedidasComponent>
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
