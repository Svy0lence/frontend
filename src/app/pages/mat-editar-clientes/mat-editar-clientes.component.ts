import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MatRegisterComponent } from '../mat-crear-usuarios/mat-register.component';
import { Cliente } from 'src/app/models/interfaces/cliente.interface';

@Component({
  selector: 'app-mat-editar-clientes',
  templateUrl: './mat-editar-clientes.component.html',
  styleUrls: ['./mat-editar-clientes.component.scss']
})
export class MatEditarClientesComponent {
  clientes!: Cliente;

  registerForm= new FormGroup({
    dni: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    puntos: new FormControl('', Validators.required),
  },);

  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente // Recibiendo los datos del usuario seleccionado
    ){
      this.MostrarCajas();
    }

 

  MostrarCajas(){
    this.registerForm.setValue({
      dni: this.data.dni,
      nombre: this.data.nombre,
      telefono: this.data.telefono,
      puntos: this.data.puntos,
      apellido: this.data.apellido
    });
    

  }

  actualizar() {

    if (this.registerForm.valid) {
    
      this.clientes = {
        id: this.data.id,
        dni: this.registerForm.get('dni')?.value,
        nombre: this.registerForm.get('nombre')?.value,
        telefono: this.registerForm.get('telefono')?.value,
        puntos: this.registerForm.get('puntos')?.value,
        apellido: this.registerForm.get('apellido')?.value,
      }
      
      this.api.post('cliente/edit', this.clientes).subscribe(response => {
        // Maneja la respuesta del servidor
        if (response.status) {
          // Éxito
          this.dialogRef.close();
          alert("Actualizado con éxito");
        }else {
          // Error
          console.error('Error al Editar la categoria: ' + response.message);
          alert("Error al editar la categoria :C");
        }
      }, error => {
        // Maneja errores de la solicitud
        console.error('Error en la solicitud:', error);
      });
  
    }
  
  }

}
