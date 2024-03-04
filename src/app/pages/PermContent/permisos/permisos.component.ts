import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCrearRolesComponent } from '../mat-crear-roles/mat-crear-roles.component';
import { ApiService } from 'src/app/services/api.service';
import {Rol} from 'src/app/models/interfaces/rol.interface'
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatEditarRolesComponent } from '../mat-editar-roles/mat-editar-roles.component';
;
import { Menu } from 'src/app/models/interfaces/menu.interface';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { MatEliminarComponent } from 'src/app/components/mat-eliminar/mat-eliminar.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  permisosData: any;

  disabledButtons: boolean = false;
  
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25];
  displayedColumns: string[] = ['nombre','estado', 'acciones'];
  dataSource = new MatTableDataSource<Rol>([]);


  constructor(private dialog: MatDialog, public api: ApiService, private paginatorIntl: MatPaginatorIntl, private notificadorRef:NotificadorComponent){
     this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
     this.MostrarRoles();
  }

  openSnackBar() {
    const message = 'Rol Eliminado Correctamente'; 
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async MostrarRoles(){
    
    
    const rolList = await this.api.get('rol/list').toPromise();
    
    this.permisosData = rolList.data
    this.dataSource = new MatTableDataSource(this.permisosData);


    this.paginator.length = this.permisosData.length
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log(this.paginator)
  }


  openDialog() {
    const dialogRef = this.dialog.open(MatCrearRolesComponent, {
      width: '60vw',
      height:'80vh'
       // Puedes personalizar el ancho y otras propiedades
    });
    dialogRef.afterClosed().subscribe(() => {
      this.MostrarRoles();
    });
    
  }

  openDialog2(selectRol: Rol) {
    const dialogRef = this.dialog.open(MatEditarRolesComponent, {
      data: selectRol,
      width: '60vw',
      height:'80vh'
       // Puedes personalizar el ancho y otras propiedades
    });
    dialogRef.afterClosed().subscribe(() => {
      this.MostrarRoles();
    });
  }
  
  eliminar(rol: Rol){
    const rolId = rol.id
    const dialogRef = this.dialog.open(MatEliminarComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('rol/delete', {rolId}).subscribe(response => {
          if (response.status) {
            this.openSnackBar();
            this.MostrarRoles();    
          } else {
            alert("Error al crear la categoria :C");
          }
        }, error => {
          console.error('Error en la solicitud:', error);
        });
      }
    });

  }

  onPageChange(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.MostrarRoles();
  }


}
