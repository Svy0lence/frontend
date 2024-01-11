import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Entrada } from 'src/app/models/interfaces/entrada.interface';
import { ApiService } from 'src/app/services/api.service';
import { formatearFecha } from 'src/app/utils/formatoFecha';

@Component({
  selector: 'app-mat-editar-entrada',
  templateUrl: './mat-editar-entrada.component.html',
  styleUrls: ['./mat-editar-entrada.component.scss']
})
export class MatEditarEntradaComponent {
  constructor(private api: ApiService , @Inject(MAT_DIALOG_DATA) public data: Entrada, private dialogRef: MatDialogRef<MatEditarEntradaComponent>){
    this.mostrarCajas();
  }
  entrada!: Entrada;
  registerForm= new FormGroup({
    clave: new FormControl(null, Validators.required),
    fecha_venci: new FormControl(null, Validators.required),
    cantidad:new FormControl(null, Validators.required),
   
    
  },);

  // registrar(){
  //   if (this.registerForm.valid) {
  //     const fechaVenci = formatearFecha(this.registerForm.get('fecha_venci')?.value, true)
  //     this.entrada = {
  //       id: this.data.id,
  //       fecha_venci: fechaVenci,
  //       cantidad: this.registerForm.get('cantidad')?.value,
  //     }
  //     this.api.post('entrada/edit', this.entrada).subscribe(response => {
  //       if (response.status) {
  //         this.dialogRef.close();
  //         console.log('categoria actualizado correctamente'+  JSON.stringify(this.entrada));
  //         alert("Actualizado con éxito");
  //       } else {
  //         console.error('Error al Editar la categoria: ' + response.message);
  //         alert("Error al editar la categoria :C");
  //       }
  //     }, error => {
  //       // Maneja errores de la solicitud
  //       console.error('Error en la solicitud:', error);
  //     });
  //   }
  // }

  mostrarCajas(){
    this.registerForm.setValue({
     clave: this.data.clave,
     fecha_venci: this.data.fecha_venci,
     cantidad: this.data.cantidad
    });
  }

}
