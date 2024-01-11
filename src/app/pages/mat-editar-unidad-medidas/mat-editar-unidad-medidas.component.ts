import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departamento } from 'src/app/models/interfaces/departamento.interface';
import { UnidadCompras } from 'src/app/models/interfaces/unidadCompras.interface';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-mat-editar-unidad-medidas',
  templateUrl: './mat-editar-unidad-medidas.component.html',
  styleUrls: ['./mat-editar-unidad-medidas.component.scss']
})
export class MatEditarUnidadMedidasComponent {

  unidadCompras!: UnidadCompras;
  toggleChecked!: any;

  registerForm= new FormGroup({
    descripcion: new FormControl('', Validators.required),
    estadoUnidad: new FormControl(false, Validators.required),
    //confirmarContraseña: new FormControl('', Validators.required),
  },);

  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatEditarUnidadMedidasComponent>,@Inject(MAT_DIALOG_DATA) public data: UnidadCompras ){
    this.mostrarCajas();
  }

  onToggleChange() {
    
    console.log('Estado cambiado:', this.toggleChecked);
  }

  mostrarCajas(){
    this.toggleChecked = this.data.estadoUnidad
    this.registerForm.setValue({
      descripcion: this.data.descripcion,
      estadoUnidad: this.toggleChecked
    });

  }

  actualizar(){

    if (this.registerForm.valid) {
    
    this.unidadCompras = {
      id: this.data.id,
      descripcion: this.registerForm.get('descripcion')?.value,
      estadoUnidad: this.registerForm.get('estadoUnidad')?.value
      
    }
    this.api.post('unidad/edit', this.unidadCompras).subscribe(response => {
      // Maneja la respuesta del servidor
      if (response.status) {
        // Éxito
        this.dialogRef.close();
        console.log('categoria actualizado correctamente'+  JSON.stringify(this.unidadCompras));
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
