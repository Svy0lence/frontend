import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Salida } from 'src/app/models/interfaces/salida.interface';

@Component({
  selector: 'app-mat-resumen-salidas',
  templateUrl: './mat-resumen-salidas.component.html',
  styleUrls: ['./mat-resumen-salidas.component.scss']
})
export class MatResumenSalidasComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Salida){
    this.mostrarCajas();
  }
  salida! : Salida

  registerForm= new FormGroup({
    clave: new FormControl(null, Validators.required),
    registro: new FormControl(null, Validators.required),
    tipo: new FormControl(null, Validators.required),
    clave_producto: new FormControl(null, Validators.required),
    lote_entrada: new FormControl(null, Validators.required),
    cantidad:new FormControl(null, Validators.required),
   
    
  },);

  mostrarCajas(){
    this.registerForm.setValue({
     clave: this.data.clave,
     registro: this.data.fecha_registro,
     tipo: this.data.tipo,
     clave_producto: this.data.producto,
     lote_entrada: this.data.lote,
     cantidad: this.data.cantidad
    });
  }

}
