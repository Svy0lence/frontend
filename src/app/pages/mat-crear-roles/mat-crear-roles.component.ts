import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { permisos } from 'src/app/models/permisos.interface';
import { Menu } from 'src/app/models/interfaces/menu.interface';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificadorComponent } from 'src/app/notificador/notificador.component';

@Component({
  selector: 'app-mat-crear-roles',
  templateUrl: './mat-crear-roles.component.html',
  styleUrls: ['./mat-crear-roles.component.scss'],
})
export class MatCrearRolesComponent {
  menus: Menu[] = [];
  submenus: Menu[] = [];
  
  nombre = new FormControl('');

  constructor(public api: ApiService, private dialogRef: MatDialogRef<MatCrearRolesComponent>,private notificadorRef:NotificadorComponent) {
    this.mostrarRoles();
  }
  openSnackBar() {
    const message = 'Rol creado exitosamente'; 
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }


  async mostrarRoles() {
    const sysmenu = await this.api.get('sysmenu/listMenu').toPromise();
    const syssubmenu = await this.api.get('sysmenu/listSubMenu').toPromise();

    this.menus = sysmenu.data.map((menu: Menu) => {
      return {
        id: menu.id,
        nombre: menu.nombre,
        padreId: menu.padreId,
        posicion: menu.posicion,
        completed: false,
        submenus: [],
      };
    });

    this.submenus = syssubmenu.data.map((submenu: Menu) => {
      return {
        id: submenu.id,
        nombre: submenu.nombre,
        padreId: submenu.padreId,
        posicion: submenu.posicion,
      };
    });

    this.menus.forEach((menu) => {
      menu.submenus = this.submenus.filter((submenu) => submenu.padreId === menu.id);
    });
  }

  seleccionarMenu(menu: Menu) {
    // Cambiar el estado de todos los submenús según el estado de "seleccionarTodo"
    if (menu.submenus) {
      for (const submenu of menu.submenus) {
        submenu.completed = menu.completed;
      }
    }
  }

  desSeleccionarMenu(menu: Menu) {
    if (menu.submenus) {
      
      const someSelected = menu.submenus.some((submenu) => submenu.completed);
      if (!someSelected) {
        menu.completed = false; // Ningún submenú está seleccionado, deseleccionar al menú
      }
    }
  }

  registrar() {
    let menuSeleccionados: any[] = [];
    //let subMenuSeleccionados: any[] = [];

    for (const valor of this.menus) {
      if (valor.completed) {
        // Si el menú está seleccionado, agregarlo a los seleccionados
        menuSeleccionados.push(valor);

        // Filtrar submenús deshabilitados
        if (valor.submenus) {
          menuSeleccionados = menuSeleccionados.concat(valor.submenus.filter((submenu) => submenu.completed));
        }
      }
    }

    const listMenu = menuSeleccionados;
    const name = this.nombre.value;
    this.actualizarRol(name, listMenu);
  }



  actualizarRol(name: any, listMenu: any[]) {
    this.api.post('rol/create', {name, listMenu}).subscribe(response => {
      if (response.status) {
        this.dialogRef.close();
        this.openSnackBar();
      } else {
        alert("Error al crear la categoria :C");
      }
    }, error => {
      console.error('Error en la solicitud:', error);
    });
    
  }
  
}
