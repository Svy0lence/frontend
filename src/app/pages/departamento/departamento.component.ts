import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { ApiService } from 'src/app/services/api.service';
import { Departamento } from 'src/app/models/interfaces/departamento.interface';
import { MatCrearDepartamentosComponent } from '../mat-crear-departamentos/mat-crear-departamentos.component';
import { MatEditarDepartamentosComponent } from '../mat-editar-departamentos/mat-editar-departamentos.component';
import { MatEliminarDepartamentosComponent } from '../mat-eliminar-departamentos/mat-eliminar-departamentos.component';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent {

    
  @ViewChild('paginator') paginator!: MatPaginator;

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
    this.mostrarDepartamentos();
  }

  displayedColumns: string[] = ['numero', 'descripcion', 'estadoDepart','acciones'];
  dataSource = new MatTableDataSource<Departamento>([]);
  pageIndex = 0;
  pageSize = 30;
  pageSizeOptions = [30, 50, 100];
  API_URL = API_URL;

  async mostrarDepartamentos(){
    try {
      const DepartList = await this.api.get('departamento/list').toPromise();
      
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.dataSource = DepartList.data
        .slice(startIndex, endIndex)
        .map((departamento: Departamento) => {
          return {
            id: departamento.id,
            descripcion: departamento.descripcion,
            estadoDepart: departamento.estadoDepart
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
    const dialogRef = this.dialog.open(MatCrearDepartamentosComponent, {
      width: '50vw',
      height: '50vh'
     });
     dialogRef.afterClosed().subscribe(() => {
        this.mostrarDepartamentos();
     });
  }

  opendialog2(selectedDepart: Departamento) {
     const dialogRef = this.dialog.open(MatEditarDepartamentosComponent, {
       data: selectedDepart,
       width: '50vw',
       height: '60vh'
     });
     dialogRef.afterClosed().subscribe(() => {
       this.mostrarDepartamentos();
     });
  }

  messageAlert(departamento: Departamento) {

    const dialogRef = this.dialog.open(MatEliminarDepartamentosComponent);
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('departamento/delete', departamento).subscribe(response => {
          if (response.status) {
            alert("eliminado con Eficacia")
            this.mostrarDepartamentos();
          } else {
            alert("Error al eliminado el usuario :C")
          }
        }, error => {
          console.error('Error al eliminado el usuario: ' + departamento.id);
        });
        
      }              
    });
  }
  

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


}
