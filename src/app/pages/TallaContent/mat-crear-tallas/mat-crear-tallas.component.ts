import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';

@Component({
  selector: 'app-mat-crear-tallas',
  templateUrl: './mat-crear-tallas.component.html',
  styleUrls: ['./mat-crear-tallas.component.scss']
})
export class MatCrearTallasComponent {
  
  nombre = new FormControl('', Validators.required);
  constructor(public api: ApiService, private dialogRef: MatDialogRef<MatCrearTallasComponent>, 
              private notificadorRef:NotificadorComponent){
  }

  registrar(){
    const talla = {
      NombreTalla: this.nombre.value
    }
   
    this.api.post('talla/create', talla).subscribe(response => {
      if (response.status) {
        this.dialogRef.close();
        this.openSnackBar(response.message)
      } else {
        this.openSnackBar(response.message, "cancel")
        
      }
    }, error => {
      this.openSnackBar(error.error.message, "cancel")
      console.log(error)
    });
  }
  
  openSnackBar(message: string, image: string = 'check_circle') {
    this.notificadorRef.openSnackBar(message, image, 5);
  }
}




