import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { Salida } from 'src/app/models/interfaces/salida.interface';
import { MatCrearSalidasComponent } from '../mat-crear-salidas/mat-crear-salidas.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MatResumenSalidasComponent } from '../mat-resumen-salidas/mat-resumen-salidas.component';

@Component({
  selector: 'app-salida-producto',
  templateUrl: './salida-producto.component.html',
  styleUrls: ['./salida-producto.component.scss']
})
export class SalidaProductoComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  pageIndex = 0;
  pageSize = 30;
  pageSizeOptions = [30, 50, 100];
  displayedColumns: string[] = ['clave', 'fecha','tipo','producto','lote','cantidad','acciones'];

  dataSource = new MatTableDataSource<Salida>([]);
  API_URL = API_URL;
 



  ngAfterViewInit(): void {
    this.MostrarSalidas();
    if (this.paginator) {
     this.dataSource.paginator = this.paginator;
   }
  }
 
  ngOnInit(): void {
   this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog,  private api:ApiService){

  }

  async MostrarSalidas(){
    const salidasList = await this.api.get('salida/list').toPromise();

    try{
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource = salidasList.data
      .slice(startIndex, endIndex)
      .map((salida: Salida) => {
        return {
          id:salida.id,
          fecha_registro:salida.fecha_registro,
          clave:salida.clave,
          tipo:salida.tipo,
          producto:salida.producto,
          cantidad:salida.cantidad,
          lote:salida.lote

        };
      });

    if (this.paginator) {
      this.paginator.length = salidasList.data.length;
    }
    }catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }

  }




  openDialog() {
    const dialogRef = this.dialog.open(MatCrearSalidasComponent, {
      width: '60vw',
      height: '80vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.MostrarSalidas();
    });
  }

  openDialog2(salida: Salida){
    const dialogRef = this.dialog.open(MatResumenSalidasComponent, {
      width: '60vw',
      height: '80vh',
      data: salida
    });
    dialogRef.afterClosed().subscribe(() => {
      this.MostrarSalidas();
    });
  }

 

 
  

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


}

