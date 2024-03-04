import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { Color } from 'src/app/models/interfaces/color.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mat-editar-colores',
  templateUrl: './mat-editar-colores.component.html',
  styleUrls: ['./mat-editar-colores.component.scss']
})
export class MatEditarColoresComponent {

  color!: Color;

  codigo = new FormControl(null, Validators.required);
  nombre = new FormControl('', Validators.required);


  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatEditarColoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Color, private notificadorRef:NotificadorComponent ){
    this.mostrarCajas();
  }


  mostrarCajas(){
    this.codigo.setValue(this.data.idColor);
    this.nombre.setValue(this.data.NombreColor);
  }

  actualizar(){
    this.color = {
      idColor: this.codigo.value,
      NombreColor: this.nombre.value
    }
    this.api.post('color/update', this.color).subscribe(response => {
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


