import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Producto } from 'src/app/models/interfaces/producto.interface';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { MostrarColor, MostrarMarca, MostrarModelo, MostrarTalla } from 'src/app/utils/GetCmb';
import { Marca } from 'src/app/models/interfaces/marca.interface';
import { Modelo } from 'src/app/models/interfaces/modelo.interface';
import { Color } from 'src/app/models/interfaces/color.interface';
import { Talla } from 'src/app/models/interfaces/talla.interface';

@Component({
  selector: 'app-mat-crear-productos',
  templateUrl: './mat-crear-productos.component.html',
  styleUrls: ['./mat-crear-productos.component.scss']
})
export class MatCrearProductosComponent {

  producto!: Producto;
  imagePreview!: string;
  imageFile!: File;

  marcaList!: Marca[];
  modeloList!: Modelo[];
  colorList!: Color[];
  tallaList!: Talla[];
  
  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatCrearProductosComponent>, private notificadorRef:NotificadorComponent){
  }

  openSnackBar(message: string) {
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }
 
  registerForm= new FormGroup({
    NombreProducto: new FormControl('', Validators.required),
    idMarca: new FormControl(null, Validators.required),
    idModelo: new FormControl(null, Validators.required),
    idColor: new FormControl(null, Validators.required),
    idTalla: new FormControl(null, Validators.required),
    PrecioVenta: new FormControl(null, [Validators.required]),
  },);

  ngOnInit():void {
   this.MostrarMarca();
   this.MostrarModelo();
   this.MostrarColor();
   this.MostrarTalla();
  }

  async MostrarMarca() {
    try{
      this.marcaList = await MostrarMarca(this.api);
    }catch(error){
      alert(error);
    }
  }

  async MostrarModelo() {
    try{
      this.modeloList = await MostrarModelo(this.api);
    }catch(error){
      alert(error);
    }
  }

  async MostrarColor() {
    try{
      this.colorList = await MostrarColor(this.api);
    }catch(error){
      alert(error);
    }
  }

  async MostrarTalla() {
    try{
      this.tallaList = await MostrarTalla(this.api);
    }catch(error){
      alert(error);
    }
  }

  registrar() {
   
    if (this.registerForm.valid) {
      this.producto = {
        NombreProducto: this.registerForm.get('NombreProducto')?.value,
        idMarca: this.registerForm.get('idMarca')?.value,
        idModelo: this.registerForm.get('idModelo')?.value,
        idColor: this.registerForm.get('idColor')?.value,
        idTalla: this.registerForm.get('idTalla')?.value,
        PrecioVenta: this.registerForm.get('PrecioVenta')?.value
      };

        console.log('Usuario:', this.producto);
        console.log('Image File:', this.imageFile);

        // Crea un FormData y agrega el usuario como cadena JSON
        const formData = new FormData();
        formData.append('NombreProducto', this.producto.NombreProducto);
        formData.append('idMarca', this.producto.idMarca.toString());
        formData.append('idModelo', this.producto.idModelo.toString());
        formData.append('idColor', this.producto.idColor.toString());
        formData.append('idTalla', this.producto.idTalla.toString());
        formData.append('PrecioVenta', this.producto.PrecioVenta.toString());

      
        if(this.imageFile != null){
          formData.append('image', this.imageFile);
        }



        this.api.post('producto/create', formData).subscribe(response => {
          // Maneja la respuesta del servidor
          if (response.status) {

            this.dialogRef.close();
            this.openSnackBar('Usuario Creado Correctamente');

          } else {
            this.openSnackBar('Error al crear el usuario: ' + response.message);
          }
        }, error => {
          this.openSnackBar('Error en la solicitud:'+ error.error.message);
          console.log(error)
        });
      
      
    }  
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.isFileAnImage(file)) {
        this.imageFile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        }

        reader.readAsDataURL(file);
      } else {
        console.log('El archivo seleccionado no es una imagen.');
        // Puedes mostrar un mensaje de error al usuario si lo deseas.
        // También puedes restablecer el input de archivo para borrar la selección no válida.
        input.value = '';
      }
    }
  }

  private isFileAnImage(file: File): boolean {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', /* Agrega más tipos de imágenes si es necesario */];
    return allowedImageTypes.includes(file.type);
  }

}
