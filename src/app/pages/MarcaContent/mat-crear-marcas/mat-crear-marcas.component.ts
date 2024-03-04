import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';

@Component({
  selector: 'app-mat-crear-marcas',
  templateUrl: './mat-crear-marcas.component.html',
  styleUrls: ['./mat-crear-marcas.component.scss']
})
export class MatCrearMarcasComponent {
  
  nombre = new FormControl('', Validators.required);
  constructor(public api: ApiService, private dialogRef: MatDialogRef<MatCrearMarcasComponent>, 
              private notificadorRef:NotificadorComponent){
  }

  registrar(){
    const marca = {
      NombreMarca: this.nombre.value
    }
   
    this.api.post('marca/create', marca).subscribe(response => {
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




