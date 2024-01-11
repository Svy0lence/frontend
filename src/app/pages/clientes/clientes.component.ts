import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { Cliente } from 'src/app/models/interfaces/cliente.interface';
import { ApiService } from 'src/app/services/api.service';
import { MatEditarClientesComponent } from '../mat-editar-clientes/mat-editar-clientes.component';
import { MatEliminarClientesComponent } from '../mat-eliminar-clientes/mat-eliminar-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {

  @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumns: string[] = ['dni', 'nombre', 'apellido','telefono', 'saldo', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>([]);
  pageIndex = 0;
  pageSize = 30;
  pageSizeOptions = [30, 50, 100];
  API_URL = API_URL;

  ngAfterViewInit(): void {
     if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private api: ApiService,private paginatorIntl: MatPaginatorIntl) { 
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.mostrarClientes();
  }

  async mostrarClientes(){
    try {
      const ClientList = await this.api.get('cliente/list').toPromise();
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.dataSource = ClientList.data
        .slice(startIndex, endIndex)
        .map((cliente: Cliente) => {
          return {
            id: cliente.id,
            dni: cliente.dni,
            nombre: cliente.nombre,
            apellido:cliente.apellido,
            telefono: cliente.telefono,
            puntos: cliente.puntos
          };
        });
      console.log('this.paginator:', this.paginator);
      if (this.paginator) {
        this.paginator.length = ClientList.data.length;
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }
    
  }


  opendialog2(selectedCliente: Cliente) {
    const dialogRef = this.dialog.open(MatEditarClientesComponent, {
      data: selectedCliente,
      width: '60vw',
      height: '80vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.mostrarClientes();
    });
  }

  messageAlert(cliente: Cliente) {

     const dialogRef = this.dialog.open(MatEliminarClientesComponent);

     dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('cliente/delete', cliente).subscribe(response => {
          if (response.status) {
            alert("eliminado con Eficacia")
            this.mostrarClientes();
          } else {
            alert("Error al eliminado el usuario :C")
          }
        }, error => {
          console.error('Error al eliminado el usuario: ' + cliente.id);
        });
        console.error('Error al eliminado el usuario: ');
        
      }
    });
    
    

  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}
