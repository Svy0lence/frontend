  import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { MatCrearUsuariosComponent } from '../mat-crear-usuarios/mat-crear-usuarios.component';
  import { ApiService } from 'src/app/services/api.service';
  import { MatEditarUsuariosComponent } from '../mat-editar-usuarios/mat-editar-usuarios.component';
  import { User } from 'src/app/models/interfaces/user.interface';
  import { API_URL } from 'src/app/ServicioApi/apiConfig';
  import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
  import { MatTableDataSource } from '@angular/material/table';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { MatEliminarComponent } from 'src/app/components/mat-eliminar/mat-eliminar.component';
import { MatSort } from '@angular/material/sort';


  @Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
  })
  export class UsuariosComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    usuariosData: any;


    displayedColumns: string[] = ['nombre', 'apellido', 'username', 'rol', 'estado', 'photo', 'acciones'];
    API_URL = API_URL;
    auxEstado!: string;
    pageIndex = 0;
    pageSize = 5;
    pageSizeOptions = [5, 10, 25];
    dataSource = new MatTableDataSource<User>([]);
    pageRangeToShow = 3;

    ngOnInit(): void {
      this.MostrarUsuarios();
      this.dataSource.paginator = this.paginator;
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

    openSnackBar() {
      const message = 'Usuario Eliminado Correctamente'; 
      this.notificadorRef.openSnackBar(message, 'check_circle', 5);
    }

    constructor(public dialog: MatDialog, private api: ApiService,private paginatorIntl: MatPaginatorIntl, private notificadorRef:NotificadorComponent) { 
      this.paginatorIntl.itemsPerPageLabel = 'Elementos por página'; 
    }

    onPageChange(event: PageEvent) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.MostrarUsuarios();
    }

    getDisplayedPages(): number[] {
      const startIndex = this.pageIndex - Math.floor(this.pageRangeToShow / 2);
    
      return Array.from({ length: this.pageRangeToShow }, (_, index) => startIndex + index);
    }

    async MostrarUsuarios() {
      const userList = await this.api.get('user/list').toPromise();

      this.usuariosData = userList.data
      this.dataSource = new MatTableDataSource(this.usuariosData);


      this.paginator.length = this.usuariosData.length
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(this.paginator)
    }

    openDialog() {
      const dialogRef = this.dialog.open(MatCrearUsuariosComponent, {
        width: '60vw',
        height: '80vh'
      });
      dialogRef.afterClosed().subscribe(() => {
        this.MostrarUsuarios();  
      });
    }

    opendialog2(selectedUser: User) {
      const dialogRef = this.dialog.open(MatEditarUsuariosComponent, {
        data: selectedUser,
        width: '60vw',
        height: '80vh'
      });
      dialogRef.afterClosed().subscribe(() => {
        this.MostrarUsuarios();
      });
    }

    messageAlert(user: User) {
      
      const dialogRef = this.dialog.open(MatEliminarComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('user/delete', user).subscribe(response => {
          if (response.status) {
            this.openSnackBar();
            this.MostrarUsuarios();
          } else {
          }
        }, error => {
          console.error('Error en la solicitud:', error);
        });
      }
    });

      


    }
  }
