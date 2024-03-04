
import { DashboardComponent } from './dashboard/dashboard.component';

import { PagesComponent } from './pages.component';

//---------------------Usuario-------------------------------------
import { UsuariosComponent } from './UsuContent/usuarios/usuarios.component';
import { MatCrearUsuariosComponent } from './UsuContent/mat-crear-usuarios/mat-crear-usuarios.component';
import { MatEditarUsuariosComponent } from './UsuContent/mat-editar-usuarios/mat-editar-usuarios.component';


//---------------------Permisos-------------------------------------
import { PermisosComponent } from './PermContent/permisos/permisos.component';
import { MatCrearRolesComponent } from './PermContent/mat-crear-roles/mat-crear-roles.component';
import { MatEditarRolesComponent } from './PermContent/mat-editar-roles/mat-editar-roles.component';

//---------------------Marca-------------------------------------------
import { MarcaComponent } from './MarcaContent/marcas/marcas.component';
import { MatCrearMarcasComponent } from './MarcaContent/mat-crear-marcas/mat-crear-marcas.component';
import { MatEditarMarcasComponent } from './MarcaContent/mat-editar-marcas/mat-editar-marcas.component';


//---------------------Modelos-------------------------------------------
import { ModelosComponent } from './ModeloContent/modelos/modelos.component';
import { MatCrearModelosComponent } from './ModeloContent/mat-crear-modelos/mat-crear-modelos.component';
import { MatEditarModelosComponent } from './ModeloContent/mat-editar-modelos/mat-editar-modelos.component';


//---------------------Colores-------------------------------------------
import { ColoresComponent } from './ColorContent/colores/colores.component';
import { MatCrearColoresComponent } from './ColorContent/mat-crear-colores/mat-crear-colores.component';
import { MatEditarColoresComponent } from './ColorContent/mat-editar-colores/mat-editar-colores.component';


//---------------------Tallas-------------------------------------------
import { TallasComponent } from './TallaContent/tallas/tallas.component';
import { MatEditarTallasComponent } from './TallaContent/mat-editar-tallas/mat-editar-tallas.component';
import { MatCrearTallasComponent } from './TallaContent/mat-crear-tallas/mat-crear-tallas.component';




//---------------------Productos-------------------------------------------
import { ProductosComponent } from './ProduContent/productos/productos.component';
import { MatCrearProductosComponent } from './ProduContent/mat-crear-productos/mat-crear-productos.component';
import { MatEditarProductosComponent } from './ProduContent/mat-editar-productos/mat-editar-productos.component';



//---------------------dialogos----------------------------------------------
import { MatEliminarComponent } from '../components/mat-eliminar/mat-eliminar.component';
import { DialogCloseComponent } from 'src/app/materials/dialog-close/dialog-close.component';
import { SalirComponent } from './salir/salir.component';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { SnackBarComponent } from 'src/app/materials/snack-bar/snack-bar.component';




//-----------------------------imports-----------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule} from '@angular/material/sort';


import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';






@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    PagesComponent,


    MatCrearUsuariosComponent,
    MatEditarUsuariosComponent,
    PermisosComponent,
    MatCrearRolesComponent,
    MatEditarRolesComponent,

    //marcas
    MarcaComponent,
    MatCrearMarcasComponent,
    MatEditarMarcasComponent,

    //modelos
    ModelosComponent,
    MatCrearModelosComponent,
    MatEditarModelosComponent,

    //colores
    ColoresComponent,
    MatCrearColoresComponent,
    MatEditarColoresComponent,

    //tallas
    TallasComponent,
    MatCrearTallasComponent,
    MatEditarTallasComponent,

    //dialogos de seleccion
    MatEliminarComponent,
    DialogCloseComponent,
    SalirComponent,
    NotificadorComponent,
    SnackBarComponent,
    ProductosComponent,
    MatCrearProductosComponent,
    MatEditarProductosComponent,

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // Configura el idioma español
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatRadioModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSortModule
    
  ],
  exports: [
    DashboardComponent,
    UsuariosComponent,
  ],
  bootstrap: [AppComponent]

})
export class PagesModule { }
