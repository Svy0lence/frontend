import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-eliminar-roles',
  templateUrl: './mat-eliminar-roles.component.html',
  styleUrls: ['./mat-eliminar-roles.component.scss']
})
export class MatEliminarRolesComponent {
  constructor(private dialogRef: MatDialogRef<MatEliminarRolesComponent>) {}

  confirmarEliminacion() {
    // Aquí decides qué valor quieres devolver, por ejemplo, `true` si el usuario confirma
    const resultado = true;

    // Cierra el diálogo y pasa el resultado
    this.dialogRef.close(resultado);
  }

  cancelarEliminacion() {
    // Puedes decidir qué valor quieres devolver en caso de cancelación, por ejemplo, `false`
    const resultado = false;

    // Cierra el diálogo y pasa el resultado
    this.dialogRef.close(resultado);
  }
}
