import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Categoria } from 'src/app/models/interfaces/categoria.interface';

@Component({
  selector: 'app-mat-editar-categorias',
  templateUrl: './mat-editar-categorias.component.html',
  styleUrls: ['./mat-editar-categorias.component.scss']
})
export class MatEditarCategoriasComponent {
  categoria!: Categoria;
  toggleChecked!: any;

  registerForm= new FormGroup({
    descripcion: new FormControl('', Validators.required),
    estadoCategoria: new FormControl(false, Validators.required),
    //confirmarContraseña: new FormControl('', Validators.required),
  },);

  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatEditarCategoriasComponent>,@Inject(MAT_DIALOG_DATA) public data: Categoria ){
    this.mostrarCajas();
  }

  onToggleChange() {
    
    console.log('Estado cambiado:', this.toggleChecked);
  }

  mostrarCajas(){
    this.toggleChecked = this.data.estadoCategoria
    this.registerForm.setValue({
      descripcion: this.data.descripcion,
      estadoCategoria: this.toggleChecked
    });

  }

  actualizar(){

    if (this.registerForm.valid) {
    
    this.categoria = {
      id: this.data.id,
      descripcion: this.registerForm.get('descripcion')?.value,
      estadoCategoria: this.registerForm.get('estadoCategoria')?.value
      
    }
    this.api.post('categoria/edit', this.categoria).subscribe(response => {
      // Maneja la respuesta del servidor
      if (response.status) {
        // Éxito
        this.dialogRef.close();
        console.log('categoria actualizado correctamente'+  JSON.stringify(this.categoria));
        alert("Actualizado con éxito");
      } else {
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
