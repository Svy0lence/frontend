import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { Marca } from 'src/app/models/interfaces/marca.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mat-editar-marcas',
  templateUrl: './mat-editar-marcas.component.html',
  styleUrls: ['./mat-editar-marcas.component.scss']
})
export class MatEditarMarcasComponent {

  marca!: Marca;

  codigo = new FormControl(null, Validators.required);
  nombre = new FormControl('', Validators.required);


  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatEditarMarcasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marca, private notificadorRef:NotificadorComponent ){
    this.mostrarCajas();
  }


  mostrarCajas(){
    this.codigo.setValue(this.data.idMarca);
    this.nombre.setValue(this.data.NombreMarca);
  }

  actualizar(){
    this.marca = {
      idMarca: this.codigo.value,
      NombreMarca: this.nombre.value
    }
    this.api.post('marca/update', this.marca).subscribe(response => {
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


