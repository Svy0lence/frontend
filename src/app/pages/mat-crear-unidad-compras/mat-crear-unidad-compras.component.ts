import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-mat-crear-unidad-compras',
  templateUrl: './mat-crear-unidad-compras.component.html',
  styleUrls: ['./mat-crear-unidad-compras.component.scss']
})
export class MatCrearUnidadComprasComponent {

  descripcion = new FormControl('', Validators.required);
  constructor(public api: ApiService, private dialogRef: MatDialogRef<MatCrearUnidadComprasComponent>){

  }

  registrar(){

    const unidadMedida = {
      descripcion: this.descripcion.value
    }
   
    this.api.post('unidad/create', unidadMedida).subscribe(response => {
      // Maneja la respuesta del servidor
      if (response.status) {
        // Éxito
        this.dialogRef.close();
        console.log('unidadMedida creado correctamente');
        alert("Creado con éxito");
      } else {
        // Error
        console.error('Error al crear la unidadMedida: ' + response.message);
        alert("Error al crear la unidadMedida :C");
      }
    }, error => {
      // Maneja errores de la solicitud
      console.error('Error en la solicitud:', error);
    });
  
  
}

}
