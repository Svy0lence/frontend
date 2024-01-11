import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Entrada } from 'src/app/models/interfaces/entrada.interface';
import { Salida } from 'src/app/models/interfaces/salida.interface';
import { ApiService } from 'src/app/services/api.service';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mat-crear-salidas',
  templateUrl: './mat-crear-salidas.component.html',
  styleUrls: ['./mat-crear-salidas.component.scss']
})
export class MatCrearSalidasComponent implements OnInit {

  selectedProductId: any;
  entradaList!: any[];
  filteredOptions: Observable<any[]>;

  foods: Food[] = [
    {value: 'Venta', viewValue: 'Venta'},
    {value: 'Vencimiento', viewValue: 'Vencimiento'},
    {value: 'Extraviado', viewValue: 'Extraviado'},
    {value: 'Estropeado', viewValue: 'Estropeado'},
  ];
  registerForm= new FormGroup({
    tipo: new FormControl('', Validators.required),
    id_producto: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
  },
  );
  salida!: Salida;
  constructor(private api: ApiService,private dialogRef: MatDialogRef<MatCrearSalidasComponent>){
  }

  ngOnInit(): void {
    this.filteredOptions = this.registerForm.get('id_producto').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    
  }

  private _filter(value: string | Entrada) {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : null;
    
    if (!this.entradaList) {
      return [];
    }

    if (typeof value !== 'string') {
      return this.entradaList;
    }
  
    return this.entradaList.filter(producto => 
      producto.descripcion.toLowerCase().includes(filterValue)
    );
  }


  onProductSelected(event: MatAutocompleteSelectedEvent) {
    const selectedProduct = event.option.value;
     this.registerForm.get('id_producto').setValue(selectedProduct.descripcion);
    const productId = selectedProduct.id;
    this.selectedProductId = productId;
  }

  registrar(){
    if (this.registerForm.valid) {
      this.salida = {
        tipo: this.registerForm.get('tipo')?.value,
        id_entrada: this.selectedProductId,
        cantidad: this.registerForm.get('cantidad')?.value,
      };

      console.log('Salida:', this.salida);
      console.log(this.registerForm.get('id_producto').value)
    
        // console.log(formData);

        this.api.post('salida/create', this.salida).subscribe(response => {
          // Maneja la respuesta del servidor
          if (response.status) {
            // Éxito
            this.dialogRef.close();
            console.log('Salida creado correctamente');
            alert("Creado con éxito");
          } else {
            // Error
            console.error('Error al crear el salida: ' + response.message);
            alert("Error al crear el salida :C");
          }
        }, error => {
          // Maneja errores de la solicitud
          console.error('Error en la solicitud:', error);
        });
      
      
    }
  }

  async BuscarEntrada(event: KeyboardEvent){
    try {
      
      const buscar = {
        search:this.registerForm.get('id_producto').value
      }

      const productoList = await this.api.post('salida/search/entrada',buscar).toPromise();

    
      this.entradaList = productoList.data
        .map((entrada: Entrada) => {
          console.log(entrada)
          return {
           id:entrada.id,
           descripcion: entrada.clave + " - " + entrada.producto
          };
        });

        console.log(this.entradaList)
      
    } catch (error) {
      console.error('Error al obtener la lista de entradas', error);
    }
  }

  
}
