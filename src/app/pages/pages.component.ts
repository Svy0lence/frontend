import { Component, OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../models/interfaces/user.interface';
import { ApiService } from '../services/api.service';
import { Menu } from '../models/interfaces/menu.interface';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService, private api: ApiService, private sidebarService: SidebarService){
  }
  ngOnInit(): void {
    this.generarSidebar();
  }
  
  mostrarDiv = false;
 
   async generarSidebar() {
    await this.spinner.show();
    
    let usuario!: User;
    let menusPadre!: Menu[];
    let menusHijo!: Menu[];

    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      
      const currentUser = JSON.parse(userJson);
      usuario = currentUser;

  
      try {
        const rolUser = { rol: usuario.id_rol };
  
        const menuPadre = await this.api.post('sidebar/getMenuFather', rolUser).toPromise();
        menusPadre = menuPadre.data;
  
        const menuHijo = await this.api.post('sidebar/getMenuChildren', rolUser).toPromise();
        menusHijo = menuHijo.data;
        this.mostrarDiv = true;
        this.sidebarService.setMenus(menusPadre, menusHijo);
  
      } catch (error) {
        alert(error);
      }
    }
    await this.spinner.hide();
    
  }

}
