import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatRegisterComponent } from '../mat-crear-usuarios/mat-register.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-crear-departamentos',
  templateUrl: './mat-crear-departamentos.component.html',
  styleUrls: ['./mat-crear-departamentos.component.scss']
})
export class MatCrearDepartamentosComponent {
  
  descripcion = new FormControl('', Validators.required);
  constructor(public api: ApiService, private dialogRef: MatDialogRef<MatCrearDepartamentosComponent>){

  }

  registrar(){

    const categoria = {
      descripcion: this.descripcion.value
    }
   
    this.api.post('departamento/create', categoria).subscribe(response => {
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




