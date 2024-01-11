import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Menu } from 'src/app/models/interfaces/menu.interface';
import { User } from 'src/app/models/interfaces/user.interface';
import { API_URL} from 'src/app/ServicioApi/apiConfig';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SalirComponent } from 'src/app/pages/salir/salir.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  API_URL = API_URL;
  currentUser: any ={};
  usuario!: User;
  menusPadre!: Menu[];
  menusHijo!: Menu[];

  dialogRef: MatDialogRef<SalirComponent> | null = null;
  
  constructor(private api: ApiService, private router:Router, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.generarSidebar();
  }

  logout(){
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(SalirComponent);

      this.dialogRef.afterClosed().subscribe(result => {
        console.log('El diálogo ha sido cerrado');
        this.dialogRef = null; // Restablece la referencia del diálogo a null
      });
    }
    
  }

async generarSidebar() {
  const userJson = localStorage.getItem('currentUser');

  if (userJson) {
    this.currentUser = JSON.parse(userJson);
    this.usuario = this.currentUser.data;

    try {
      
      //activas tu pantalla de carga
      const rolUser = { rol: this.usuario.id_rol };

      const menuPadre = await this.api.post('sidebar/getMenuFather', rolUser).toPromise();
      this.menusPadre = menuPadre.data;

      const menuHijo = await this.api.post('sidebar/getMenuChildren', rolUser).toPromise();
      this.menusHijo = menuHijo.data;
      //termine se desactiva

    } catch (error) {
      alert(error);
    }
  }
}

}






