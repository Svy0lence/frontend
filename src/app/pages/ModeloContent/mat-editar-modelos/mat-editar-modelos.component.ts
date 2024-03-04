import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { Modelo } from 'src/app/models/interfaces/modelo.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mat-editar-modelos',
  templateUrl: './mat-editar-modelos.component.html',
  styleUrls: ['./mat-editar-modelos.component.scss']
})
export class MatEditarModelosComponent {

  modelo!: Modelo;

  codigo = new FormControl(null, Validators.required);
  nombre = new FormControl('', Validators.required);


  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatEditarModelosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modelo, private notificadorRef:NotificadorComponent ){
    this.mostrarCajas();
  }


  mostrarCajas(){
    this.codigo.setValue(this.data.idModelo);
    this.nombre.setValue(this.data.NombreModelo);
  }

  actualizar(){
    this.modelo = {
      idModelo: this.codigo.value,
      NombreModelo: this.nombre.value
    }
    this.api.post('modelo/update', this.modelo).subscribe(response => {
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


