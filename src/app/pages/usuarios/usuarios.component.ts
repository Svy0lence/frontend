  import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { MatRegisterComponent } from '../mat-crear-usuarios/mat-register.component';
  import { ApiService } from 'src/app/services/api.service';
  import { MatEditarUsuariosComponent } from '../mat-editar-usuarios/mat-editar-usuarios.component';
  import { User } from 'src/app/models/interfaces/user.interface';
  import { API_URL } from 'src/app/ServicioApi/apiConfig';
  import { MtAlertUsuariosComponent } from '../mt-alert-usuarios/mt-alert-usuarios.component';
  import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
  import { MatTableDataSource } from '@angular/material/table';
import { NotificadorComponent } from 'src/app/notificador/notificador.component';


  @Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
  })
  export class UsuariosComponent implements OnInit, AfterViewInit {
    @ViewChild('paginator') paginator!: MatPaginator;
    notificationMessage: string = '';


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
      try {
        const userList = await this.api.get('user/list').toPromise();
        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.dataSource = userList.data
          .slice(startIndex, endIndex)
          .map((user: User) => {
            return {
              nombre: user.nombre,
              apellido: user.apellido,
              username: user.username,
              password: user.password,
              rol: user.rol,
              id_rol:user.id_rol,
              estado: user.estado,
              photo: user.photo,
            };
          });
        console.log('this.paginator:', this.paginator);
        if (this.paginator) {
          this.paginator.length = userList.data.length;
        }
      } catch (error) {
        console.error('Error al obtener la lista de usuarios', error);
      }
    }

    openDialog() {
      const dialogRef = this.dialog.open(MatRegisterComponent, {
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
      
      const dialogRef = this.dialog.open(MtAlertUsuariosComponent);

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
