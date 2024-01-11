import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { Entrada } from 'src/app/models/interfaces/entrada.interface';
import { ApiService } from 'src/app/services/api.service';
import { formatearFecha } from 'src/app/utils/formatoFecha';
import { MatCrearEntradaComponent } from '../mat-crear-entrada/mat-crear-entrada.component';
import { MatEditarEntradaComponent } from '../mat-editar-entrada/mat-editar-entrada.component';
import { MatEliminarEntradaComponent } from '../mat-eliminar-entrada/mat-eliminar-entrada.component';
import { NotificadorComponent } from 'src/app/notificador/notificador.component';

@Component({
  selector: 'app-entrada-producto',
  templateUrl: './entrada-producto.component.html',
  styleUrls: ['./entrada-producto.component.scss']
})
export class EntradaProductoComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit(): void {
     if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private api: ApiService,private paginatorIntl: MatPaginatorIntl,private notificadorRef:NotificadorComponent) { 
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.mostrarEntrada();
  }

  openSnackBar() {
    const message = 'Eliminado Correctamente'; 
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }

  displayedColumns: string[] = ['clave', 'fecha','producto','venci','cantidad','acciones'];
  dataSource = new MatTableDataSource<Entrada>([]);
  pageIndex = 0;
  pageSize = 30;
  pageSizeOptions = [30, 50, 100];
  API_URL = API_URL;

  async mostrarEntrada(){
    try {
      const DepartList = await this.api.get('entrada/list').toPromise();
      
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.dataSource = DepartList.data
        .slice(startIndex, endIndex)
        .map((entrada: Entrada) => {
          const fecharegistro = formatearFecha(entrada.fecha_registro, true)
          const fechaVenci = formatearFecha(entrada.fecha_venci, false)
          
          return {
            id: entrada.id,
            clave: entrada.clave,
            id_producto: entrada.id_producto,
            producto: entrada.producto + " - " + entrada.unidad_compra,
            fecha_registro: fecharegistro,
            fecha_venci: fechaVenci,
            cantidad: entrada.cantidad,
            id_usuario: entrada.id_usuario,
            usuario: entrada.usuario
          };
        });
      console.log('this.paginator:', this.paginator);
      if (this.paginator) {
        this.paginator.length = DepartList.data.length;
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(MatCrearEntradaComponent, {
      width: '60vw',
      height: '80vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.mostrarEntrada();
    });
  }

  opendialog2(selectdEntrada: Entrada) {
        const dialogRef = this.dialog.open(MatEditarEntradaComponent, {
          data: selectdEntrada,
          width: '60vw',
          height: '80vh'
        });
        dialogRef.afterClosed().subscribe(() => {
          this.mostrarEntrada();
        });
  }

  messageAlert(entrada: Entrada) {

     const dialogRef = this.dialog.open(MatEliminarEntradaComponent);
    
     dialogRef.afterClosed().subscribe((result: boolean) => {
       if (result) {
         this.api.post('entrada/delete', entrada).subscribe(response => {
           if (response.status) {
             this.openSnackBar();
             this.mostrarEntrada();
           } else {
             alert("Error al eliminado el usuario :C")
           }
         }, error => {
           console.error('Error al eliminado el elemento: ' + entrada.id);
         });
        
       }              
     });
  }
  

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }




}
