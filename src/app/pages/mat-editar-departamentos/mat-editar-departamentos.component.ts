import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departamento } from 'src/app/models/interfaces/departamento.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mat-editar-departamentos',
  templateUrl: './mat-editar-departamentos.component.html',
  styleUrls: ['./mat-editar-departamentos.component.scss']
})
export class MatEditarDepartamentosComponent {

  departamento!: Departamento;
  toggleChecked!: any;

  registerForm= new FormGroup({
    descripcion: new FormControl('', Validators.required),
    estadoDepart: new FormControl(false, Validators.required),
    //confirmarContraseña: new FormControl('', Validators.required),
  },);

  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatEditarDepartamentosComponent>,@Inject(MAT_DIALOG_DATA) public data: Departamento ){
    this.mostrarCajas();
  }

  onToggleChange() {
    
    console.log('Estado cambiado:', this.toggleChecked);
  }

  mostrarCajas(){
    this.toggleChecked = this.data.estadoDepart
    this.registerForm.setValue({
      descripcion: this.data.descripcion,
      estadoDepart: this.toggleChecked
    });

  }

  actualizar(){

    if (this.registerForm.valid) {
    
    this.departamento = {
      id: this.data.id,
      descripcion: this.registerForm.get('descripcion')?.value,
      estadoDepart: this.registerForm.get('estadoDepart')?.value
      
    }
    this.api.post('departamento/edit', this.departamento).subscribe(response => {
      // Maneja la respuesta del servidor
      if (response.status) {
        // Éxito
        this.dialogRef.close();
        console.log('categoria actualizado correctamente'+  JSON.stringify(this.departamento));
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
