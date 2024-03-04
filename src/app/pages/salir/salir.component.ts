import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.scss']
})
export class SalirComponent {
  constructor(private router:Router, private dialogRef: MatDialogRef<SalirComponent>){

  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

}
