import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './UsuContent/usuarios/usuarios.component';
import { MarcaComponent } from './MarcaContent/marcas/marcas.component';
import { LoginGuard } from '../guards/login.guard';
import { ModelosComponent } from './ModeloContent/modelos/modelos.component';
import { TallasComponent } from './TallaContent/tallas/tallas.component';
import { ColoresComponent } from './ColorContent/colores/colores.component';
import { ProductosComponent } from './ProduContent/productos/productos.component';
import { PermisosComponent } from './PermContent/permisos/permisos.component';


  const routes: Routes=[
    {
      path:'', redirectTo:'system/dashboard', pathMatch:'full',
    },
    {path: 'system', component: PagesComponent, canActivate: [LoginGuard],
    children: [
      {path:'dashboard', component:DashboardComponent, data:{titulo:'Dashboard'}, canActivate: [LoginGuard]},
      {path:'usuarios', component: UsuariosComponent, data:{titulo:'Usuarios'}, canActivate: [LoginGuard]},
      {path:'permisos', component: PermisosComponent, data:{titulo:'Permisos'}, canActivate: [LoginGuard]},

      {path: 'marcas', component: MarcaComponent, data:{titulo:'Marcas'}, canActivate: [LoginGuard]},
      {path: 'modelos', component: ModelosComponent, data:{titulo:'Modelos'}, canActivate: [LoginGuard]},
      {path: 'tallas', component: TallasComponent, data:{titulo:'Tallas'}, canActivate: [LoginGuard]},
      {path: 'colores', component: ColoresComponent, data:{titulo:'Colores'}, canActivate: [LoginGuard]},
      {path: 'productos', component: ProductosComponent, data:{titulo:'Productos'}, canActivate: [LoginGuard]},
    ]
  },
  
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
