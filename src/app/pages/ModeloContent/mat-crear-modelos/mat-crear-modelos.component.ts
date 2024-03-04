import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';

@Component({
  selector: 'app-mat-crear-modelos',
  templateUrl: './mat-crear-modelos.component.html',
  styleUrls: ['./mat-crear-modelos.component.scss']
})
export class MatCrearModelosComponent {
  
  nombre = new FormControl('', Validators.required);
  constructor(public api: ApiService, private dialogRef: MatDialogRef<MatCrearModelosComponent>, 
              private notificadorRef:NotificadorComponent){
  }

  registrar(){
    const modelo = {
      NombreModelo: this.nombre.value
    }
   
    this.api.post('modelo/create', modelo).subscribe(response => {
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




