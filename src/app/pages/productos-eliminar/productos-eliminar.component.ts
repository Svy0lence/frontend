import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-productos-eliminar',
  templateUrl: './productos-eliminar.component.html',
  styleUrls: ['./productos-eliminar.component.scss']
})
export class ProductosEliminarComponent {

  constructor(private dialogRef: MatDialogRef<ProductosEliminarComponent>
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
