import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Categoria } from 'src/app/models/interfaces/categoria.interface';
import { Entrada } from 'src/app/models/interfaces/entrada.interface';
import { Producto } from 'src/app/models/interfaces/producto.interface';
import { UnidadCompras } from 'src/app/models/interfaces/unidadCompras.interface';
import { ApiService } from 'src/app/services/api.service';
import  { MostrarCategorias } from 'src/app/utils/GetCmb';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { formatearFecha } from 'src/app/utils/formatoFecha';
import { NotificadorComponent } from 'src/app/notificador/notificador.component';


@Component({
  selector: 'app-mat-crear-entrada',
  templateUrl: './mat-crear-entrada.component.html',
  styleUrls: ['./mat-crear-entrada.component.scss']
})
export class MatCrearEntradaComponent implements OnInit {
  filteredProducts: Observable<any[]>;
  selectedProductId: any;
 
  entrada: Entrada;
  catList!: Categoria[];
  uniList!: UnidadCompras[];
  productoList!: Producto[];
  
  registerForm= new FormGroup({
    //clave: new FormControl(null, Validators.required),
    producto: new FormControl(null, Validators.required),
    // fecha_registro: new FormControl(null, Validators.required),
    fecha_venci: new FormControl(null, Validators.required),
    cantidad:new FormControl(null, Validators.required),
    existencia: new FormControl(null),
    
  },);

 
  openSnackBar() {
    const message = 'Cantidad agregada Correctamente'; 
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }

  constructor(public api: ApiService, private dialogRef: MatDialogRef<MatCrearEntradaComponent>, private notificadorRef:NotificadorComponent){
    this.MostrarProducto();
   
  }
  ngOnInit() {
    this.filteredProducts = this.registerForm.get('producto').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
   

  }

  private _filter(value: string | Producto) {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : null;
    
    if (!this.productoList) {
      return [];
    }

    if (typeof value !== 'string') {
      return this.productoList;
    }
  
    return this.productoList.filter(producto => 
      producto.descripcion.toLowerCase().includes(filterValue)
    );
  }

  onProductSelected(event: MatAutocompleteSelectedEvent) {
    const selectedProduct = event.option.value;
    this.registerForm.get('producto').setValue(selectedProduct.descripcion);
    const productId = selectedProduct.id;
    this.selectedProductId = productId;
  }

  

  registrar(){
     if (this.registerForm.valid) {
      //const fechaRegist = formatearFecha(this.registerForm.get('fecha_registro')?.value, true)
      const fechaVenci = formatearFecha(this.registerForm.get('fecha_venci')?.value, true)
       this.entrada = {
         clave: this.registerForm.get('clave')?.value,
         id_producto: this.selectedProductId,
         //fecha_registro: fechaRegist,
         fecha_venci: fechaVenci,
         cantidad: this.registerForm.get('cantidad')?.value,
       };
       console.log("id: "+this.selectedProductId)
       
         this.api.post('entrada/create', this.entrada).subscribe(response => {
           if (response.status) {
             this.dialogRef.close();
             console.log('entrada creado correctamente');
             this.openSnackBar();
           } else {
             // Error
            console.error('Error al agregar: ' + response.message);
            alert("Error al crear al agregar :C");
          }
        }, error => {
         // Maneja errores de la solicitud
           console.error('Error en la solicitud:', error);
         });
      
      
     }
  }

  async MostrarCategoria() {
    this.catList = await MostrarCategorias(this.api);
  }

  

  async MostrarProducto(){
    try {
      const productoList = await this.api.get('producto/list').toPromise();
      console.log("categorias lista de api: " + productoList.data)
      
     
      this.productoList = productoList.data
        .map((producto: Producto) => {
          return {
           id:producto.id,
           descripcion: producto.clave + " - " + producto.descripcion + " - " + producto.precio_venta_1 + " - " + producto.categoria + " - " + producto.departamento + " - " + producto.unidad_compra
          };
        });
        console.log(this.productoList)
      
    } catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }
  }

  

}
