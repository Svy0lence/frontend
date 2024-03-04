import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { Talla } from 'src/app/models/interfaces/talla.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mat-editar-tallas',
  templateUrl: './mat-editar-tallas.component.html',
  styleUrls: ['./mat-editar-tallas.component.scss']
})
export class MatEditarTallasComponent {

  talla!: Talla;

  codigo = new FormControl(null, Validators.required);
  nombre = new FormControl('', Validators.required);


  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatEditarTallasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Talla, private notificadorRef:NotificadorComponent ){
    this.mostrarCajas();
  }


  mostrarCajas(){
    this.codigo.setValue(this.data.idTalla);
    this.nombre.setValue(this.data.NombreTalla);
  }

  actualizar(){
    this.talla = {
      idTalla: this.codigo.value,
      NombreTalla: this.nombre.value
    }
    this.api.post('talla/update', this.talla).subscribe(response => {
      if (response.status) {
        this.dialogRef.close();
        this.openSnackBar(response.message)
      } else {
        this.openSnackBar(response.message, "cancel")
      }
    }, error => {
      this.openSnackBar(error.error.message, "cancel")
    });
  }

  openSnackBar(message: string, image: string = 'check_circle') {
    this.notificadorRef.openSnackBar(message, image, 5);
  }
}


