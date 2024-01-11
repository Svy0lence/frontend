import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './ventas/productos.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { InventarioComponent } from './productos/inventario.component';
import { EntradaProductoComponent } from './entrada-producto/entrada-producto.component';
import { SalidaProductoComponent } from './salida-producto/salida-producto.component';
import { SistemVentasComponent } from './sistem-ventas/sistem-ventas.component';
import { HistoVentasComponent } from './histo-ventas/histo-ventas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatVentasComponent } from './mat-ventas/mat-ventas.component';
import { MatDialogModule } from '@angular/material/dialog';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { MatRegisterComponent } from './mat-crear-usuarios/mat-register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatEditarUsuariosComponent } from './mat-editar-usuarios/mat-editar-usuarios.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MtAlertUsuariosComponent } from './mt-alert-usuarios/mt-alert-usuarios.component';
import { PermisosComponent } from './permisos/permisos.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCrearRolesComponent } from './mat-crear-roles/mat-crear-roles.component';
import { MatEditarRolesComponent } from './mat-editar-roles/mat-editar-roles.component';
import { MatEliminarRolesComponent } from './mat-eliminar-roles/mat-eliminar-roles.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CategoriaComponent } from './categoria/categoria.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';
import { MatCrearCategoriasComponent } from './mat-crear-categorias/mat-crear-categorias.component';
import { MatEditarCategoriasComponent } from './mat-editar-categorias/mat-editar-categorias.component';
import { MatEliminarCategoriasComponent } from './mat-eliminar-categorias/mat-eliminar-categorias.component';
import { MatCrearDepartamentosComponent } from './mat-crear-departamentos/mat-crear-departamentos.component';
import { MatEditarDepartamentosComponent } from './mat-editar-departamentos/mat-editar-departamentos.component';
import { MatEliminarDepartamentosComponent } from './mat-eliminar-departamentos/mat-eliminar-departamentos.component';
import { MatEditarUnidadMedidasComponent } from './mat-editar-unidad-medidas/mat-editar-unidad-medidas.component';
import { MatEliminarUnidadMedidasComponent } from './mat-eliminar-unidad-medidas/mat-eliminar-unidad-medidas.component';
import { MatCrearUnidadComprasComponent } from './mat-crear-unidad-compras/mat-crear-unidad-compras.component';
import { MatEditarClientesComponent } from './mat-editar-clientes/mat-editar-clientes.component';
import { MatEliminarClientesComponent } from './mat-eliminar-clientes/mat-eliminar-clientes.component';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import { VenderXMLBOLETAFACTURAComponent } from './vender-xmlboleta-factura/vender-xmlboleta-factura.component';
import { ProductosEditarComponent } from './productos-editar/productos-editar.component';
import { ProductosEliminarComponent } from './productos-eliminar/productos-eliminar.component';
import { MatCrearEntradaComponent } from './mat-crear-entrada/mat-crear-entrada.component';
import { MatEditarEntradaComponent } from './mat-editar-entrada/mat-editar-entrada.component';
import { MatEliminarEntradaComponent } from './mat-eliminar-entrada/mat-eliminar-entrada.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SalirComponent } from './salir/salir.component';
import { MatCrearSalidasComponent } from './mat-crear-salidas/mat-crear-salidas.component';
import { MatResumenSalidasComponent } from './mat-resumen-salidas/mat-resumen-salidas.component';
import {MatChipsModule} from '@angular/material/chips';
import { NotificadorComponent } from 'src/app/notificador/notificador.component';
import { SnackBarComponent } from 'src/app/materials/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';





@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    PagesComponent,
    ClientesComponent,
    InventarioComponent,
    EntradaProductoComponent,
    SalidaProductoComponent,
    SistemVentasComponent,
    HistoVentasComponent,
    MatVentasComponent,
    MatRegisterComponent,
    MatEditarUsuariosComponent,
    MtAlertUsuariosComponent,
    PermisosComponent,
    MatCrearRolesComponent,
    MatEditarRolesComponent,
    MatEliminarRolesComponent,
    CategoriaComponent,
    DepartamentoComponent,
    UnidadMedidaComponent,
    MatCrearCategoriasComponent,
    MatEditarCategoriasComponent,
    MatEliminarCategoriasComponent,
    MatCrearDepartamentosComponent,
    MatEditarDepartamentosComponent,
    MatEliminarDepartamentosComponent,
    MatEditarUnidadMedidasComponent,
    MatEliminarUnidadMedidasComponent,
    MatCrearUnidadComprasComponent,
    MatEditarClientesComponent,
    MatEliminarClientesComponent,
    CrearProductosComponent,
    VenderXMLBOLETAFACTURAComponent,
    ProductosEditarComponent,
    ProductosEliminarComponent,
    MatCrearEntradaComponent,
    MatEditarEntradaComponent,
    MatEliminarEntradaComponent,
    SalirComponent,
    MatCrearSalidasComponent,
    MatResumenSalidasComponent,
    NotificadorComponent,
    SnackBarComponent,
    

    
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
    MatFormFieldModule,
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
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    
    
    

    
  ],
  exports: [
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,

  ]
})
export class PagesModule { }
