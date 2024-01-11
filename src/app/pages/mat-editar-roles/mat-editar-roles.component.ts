import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/models/interfaces/menu.interface';
import { Rol } from 'src/app/models/interfaces/rol.interface';
import { NotificadorComponent } from 'src/app/notificador/notificador.component';
import { ApiService } from 'src/app/services/api.service';

 @Component({
  selector: 'app-mat-editar-roles',
  templateUrl: './mat-editar-roles.component.html',
  styleUrls: ['./mat-editar-roles.component.scss']
})
export class MatEditarRolesComponent {

  toggleChecked!: any;
  menus: Menu[] = [];
  submenus: Menu[] = [];
  nombre = new FormControl('');

  constructor(public api: ApiService, @Inject(MAT_DIALOG_DATA) public data: Rol, private dialogRef: MatDialogRef<MatEditarRolesComponent>, private notificadorRef:NotificadorComponent){   
    this.MostrarCajas(); 
  }
  openSnackBar() {
    const message = 'Rol Editado Correctamente'; 
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }

  registerForm= new FormGroup({
    nombre: new FormControl('', Validators.required),
    estado: new FormControl(false, Validators.required),
    //confirmarContraseña: new FormControl('', Validators.required),
  },);

  MostrarCajas(){
    this.toggleChecked = this.data.estadoRol
    this.registerForm.setValue({
      nombre: this.data.rol,
      estado: this.toggleChecked
    });
    this.mostrarRoles();
  }

  async mostrarRoles(){
    const sysmenu = await this.api.get('sysmenu/listMenu').toPromise();
    const syssubmenu = await this.api.get('sysmenu/listSubMenu').toPromise();

    const rol = { rol: this.data.id};    
    const menuPadre = await this.api.post('sidebar/getMenuFather', rol).toPromise();
    const menuHijo = await this.api.post('sidebar/getMenuChildren', rol).toPromise();
    
    this.menus = sysmenu.data.map((menu: Menu) => {
      return {
        id: menu.id,
        nombre: menu.nombre,
        padreId: menu.padreId,
        posicion: menu.posicion,
        completed: menuPadre.data.some((menuP: Menu) => menuP.id === menu.id),
        submenus: [],
      };
    });

    this.submenus = syssubmenu.data.map((submenu: Menu) => {
      return {
        id: submenu.id,
        nombre: submenu.nombre,
        padreId: submenu.padreId,
        posicion: submenu.posicion,
        completed: menuHijo.data.some((menuH: Menu) => menuH.id === submenu.id),
      };
    });

    this.menus.forEach(menu => {
      menu.submenus = this.submenus.filter(submenu => submenu.padreId === menu.id);
    });
  }

  onToggleChange() {
    console.log('Estado cambiado:', this.toggleChecked);
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
  

  registrar(){
    let menuSeleccionados: any[] = [];
    
    for (const menu of this.menus) {
      if (menu.completed) {
        // Si el menú está seleccionado, agregarlo a los seleccionados
        menuSeleccionados.push(menu);

        // Filtrar submenús deshabilitados
        if (menu.submenus) {
          menuSeleccionados = menuSeleccionados.concat(menu.submenus.filter((submenu) => submenu.completed));
        }
      }
    }

    const listMenu = menuSeleccionados;
    const rolId = this.data.id;
    const rol = {
      name: this.registerForm.get('nombre')?.value,
      estadoRol: this.registerForm.get('estado')?.value
    }

    this.actualizarRol(rol, rolId, listMenu);
    
  }
  
  actualizarRol(rol: any, rolId: any, listMenu: any[]) {
    this.api.post('rol/update', {rol, rolId, listMenu}).subscribe(response => {
      // Maneja la respuesta del servidor
      if (response.status) {
        // Éxito      
        this.openSnackBar();
        this.dialogRef.close();
      }else {
        // Error
        console.error('Error al crear la categoria: ' + response.message);
        alert("Error al crear la categoria :C");
      }
    }, error => {
      // Maneja errores de la solicitud
      console.error('Error en la solicitud:', error);
    });
    
  }
  


}
