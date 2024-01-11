import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MatRegisterComponent } from '../mat-crear-usuarios/mat-register.component';

@Component({
  selector: 'app-mat-crear-categorias',
  templateUrl: './mat-crear-categorias.component.html',
  styleUrls: ['./mat-crear-categorias.component.scss']
})
export class MatCrearCategoriasComponent {

  descripcion = new FormControl('', Validators.required);
  constructor(public api: ApiService, private dialogRef: MatDialogRef<MatRegisterComponent>){

  }

  registrar(){

    const categoria = {
      descripcion: this.descripcion.value
    }
   
    this.api.post('categoria/create', categoria).subscribe(response => {
      // Maneja la respuesta del servidor
      if (response.status) {
        // Éxito
        this.dialogRef.close();
        console.log('categoria creado correctamente');
        alert("Creado con éxito");
      } else {
        // Error
        console.error('Error al crear la categoria: ' + response.message);
        alert("Error al crear la categoria :C");
      }
    }, error => {
      // Maneja errores de la solicitud
      console.error('Error en la solicitud:', error);
    });
  
  
}
}


  
  


