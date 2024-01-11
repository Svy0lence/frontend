import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/interfaces/categoria.interface';
import { Departamento } from 'src/app/models/interfaces/departamento.interface';
import { Producto } from 'src/app/models/interfaces/producto.interface';
import { UnidadCompras } from 'src/app/models/interfaces/unidadCompras.interface';
import { NotificadorComponent } from 'src/app/notificador/notificador.component';
import { ApiService } from 'src/app/services/api.service';
import { API_URL } from 'src/app/ServicioApi/apiConfig';


@Component({
  selector: 'app-productos-editar',
  templateUrl: './productos-editar.component.html',
  styleUrls: ['./productos-editar.component.scss']
})
export class ProductosEditarComponent {
  imagePreview!: String;
  imageFile!: File;
  producto!: Producto;

  catList!: Categoria[];
  departList!: Departamento[];
  uniList!: UnidadCompras[];

  constructor( private api: ApiService, private router:Router,
    private activatedRoute: ActivatedRoute, private notificadorRef:NotificadorComponent) {
    }

  registerForm= new FormGroup({
    clave: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    costoCompra: new FormControl('', Validators.required),
    precio1: new FormControl('', Validators.required),
    precio2: new FormControl('', Validators.required),
    precio3: new FormControl('', Validators.required),
    categoria: new FormControl(null, [Validators.required]),
    departamento: new FormControl(null, [Validators.required]),
    unidad: new FormControl(null, [Validators.required]),
    precioMayoreo: new FormControl('', Validators.required),
    precioMedioMayoreo: new FormControl('', Validators.required),
    cantidadMayoreo: new FormControl('', Validators.required),
    cantidadMedioMayoreo: new FormControl('', Validators.required),
  },);

  ngOnInit(): void {

    /* this.activatedRoute.queryParams.subscribe(params => {
      console.log("QueryParams:")
      console.log(params)
    }) */

    this.TraerDatos();
    this.MostrarCategorias();
    this.MostrarDepartamentos();
    this.MostrarUnidades();
    this.MostrarCajas();
  }
  openSnackBar() {
    const message = 'Producto Editado Correctamente'; 
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }

  TraerDatos(){
    /* this.activatedRoute.params.subscribe(routeParams => {
      const productoString = routeParams['producto'];
      this.producto = JSON.parse(productoString) as Producto;
    }); */

    this.activatedRoute.queryParams.subscribe(params => {
      this.producto = params as Producto;
    }); 
  }

  MostrarCajas(){
    console.log(this.producto)

    this.imagePreview = API_URL+'images/'+this.producto.image;
    this.registerForm.setValue({
      clave: this.producto.clave,
      descripcion: this.producto.descripcion,
      costoCompra:  this.producto.costo_compra,
      precio1:  this.producto.precio_venta_1,
      precio2:  this.producto.precio_venta_2,
      precio3:  this.producto.precio_venta_3,
      categoria:  parseInt(this.producto.id_categoria) || null,
      departamento:  parseInt(this.producto.id_departamento) || null,
      unidad:  parseInt(this.producto.id_unidad_compra) || null,
      precioMayoreo:  this.producto.p_mayoreo,
      precioMedioMayoreo:  this.producto.p_med_mayoreo,
      cantidadMayoreo:  this.producto.cant_mayoreo,
      cantidadMedioMayoreo:  this.producto.cant_med_mayoreo,
    });
  }

  registrar() {
    if (this.registerForm.valid) {
      this.producto = {
        clave: this.registerForm.get('clave')?.value,
        descripcion: this.registerForm.get('descripcion')?.value,
        costo_compra: this.registerForm.get('costoCompra')?.value,
        precio_venta_1: this.registerForm.get('precio1')?.value,
        precio_venta_2: this.registerForm.get('precio2')?.value,
        precio_venta_3: this.registerForm.get('precio3')?.value,
        id_categoria: this.registerForm.get('categoria')?.value,
        id_departamento: this.registerForm.get('departamento')?.value,
        id_unidad_compra: this.registerForm.get('unidad')?.value,
        p_mayoreo: this.registerForm.get('precioMayoreo')?.value,
        p_med_mayoreo: this.registerForm.get('precioMedioMayoreo')?.value,
        cant_mayoreo: this.registerForm.get('cantidadMayoreo')?.value,
        cant_med_mayoreo: this.registerForm.get('cantidadMedioMayoreo')?.value,
      };

      console.log('Producto:', this.producto);
      console.log('Image File:', this.imageFile);

      // Crea un FormData y agrega el producto como cadena JSON
      const formData = new FormData();
      formData.append('clave', this.producto.clave);
      formData.append('descripcion', this.producto.descripcion);
      formData.append('costo_compra', this.producto.costo_compra);
      formData.append('precio_1', this.producto.precio_venta_1);
      formData.append('precio_2', this.producto.precio_venta_2);
      formData.append('precio_3', this.producto.precio_venta_3);
      formData.append('id_categoria', this.producto.id_categoria);
      formData.append('id_departamento', this.producto.id_departamento);
      formData.append('id_unidad_compra', this.producto.id_unidad_compra);
      formData.append('p_mayoreo', this.producto.p_mayoreo);
      formData.append('p_med_mayoreo', this.producto.p_med_mayoreo);
      formData.append('cant_mayoreo', this.producto.cant_mayoreo);
      formData.append('cant_med_mayoreo', this.producto.cant_med_mayoreo);

      if(this.imageFile != null){
          formData.append('image', this.imageFile);
        }

      this.api.post('producto/edit', formData).subscribe(response => {
        // Maneja la respuesta del servidor
        if (response.status) {
          // Éxito
          console.log('Usuario creado correctamente');
          console.log(formData.get("image"))
          alert("Creado con éxito");
        } else {
          // Error
          console.error('Error al crear el producto: ' + response.message);
          alert("Error al crear el producto :C");
        }
      }, error => {
        // Maneja errores de la solicitud
        console.error('Error en la solicitud:', error);
      });
      
      
    }
  }

  async MostrarCategorias() {
    try{
      const catList = await this.api.get('categoria/list').toPromise();
      this.catList = catList.data;
      console.log(this.catList);
    }catch(error){
      alert(error);
    }
  }

  async MostrarDepartamentos() {
    try{
      const departList = await this.api.get('departamento/list').toPromise();
      this.departList = departList.data;
      console.log(this.departList);
    }catch(error){
      alert(error);
    }
  }

  async MostrarUnidades() {
    try{
      const uniList = await this.api.get('unidad/list').toPromise();
      this.uniList = uniList.data;
      console.log(this.uniList);
    }catch(error){
      alert(error);
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
        input.value = '';
      }
    }
  }

  actualizar() {
    if (this.registerForm.valid) {    

      let productoUpdate !: Producto;

      productoUpdate = {
        id: this.producto.id,
        clave: this.registerForm.get('clave')?.value,
        image: this.producto.image,
        descripcion: this.registerForm.get('descripcion')?.value,
        costo_compra: this.registerForm.get('costoCompra')?.value,
        precio_venta_1: this.registerForm.get('precio1')?.value,
        precio_venta_2: this.registerForm.get('precio2')?.value,
        precio_venta_3: this.registerForm.get('precio3')?.value,
        id_categoria: this.registerForm.get('categoria')?.value,
        id_departamento: this.registerForm.get('departamento')?.value,
        id_unidad_compra: this.registerForm.get('unidad')?.value,
        p_mayoreo: this.registerForm.get('precioMayoreo')?.value,
        p_med_mayoreo: this.registerForm.get('precioMedioMayoreo')?.value,
        cant_mayoreo: this.registerForm.get('cantidadMayoreo')?.value,
        cant_med_mayoreo: this.registerForm.get('cantidadMedioMayoreo')?.value,
      };

      const formData = new FormData();
      formData.append('id', productoUpdate.id);
      formData.append('clave', productoUpdate.clave);
      formData.append('descripcion', productoUpdate.descripcion);
      formData.append('costo_compra', productoUpdate.costo_compra);
      formData.append('precio_1', productoUpdate.precio_venta_1);
      formData.append('precio_2', productoUpdate.precio_venta_2);
      formData.append('precio_3', productoUpdate.precio_venta_3); 
      formData.append('id_categoria', productoUpdate.id_categoria);
      formData.append('id_departamento', productoUpdate.id_departamento);
      formData.append('id_unidad_compra', productoUpdate.id_unidad_compra);
      formData.append('p_mayoreo', productoUpdate.p_mayoreo);
      formData.append('p_med_mayoreo', productoUpdate.p_med_mayoreo);
      formData.append('cant_mayoreo', productoUpdate.cant_mayoreo);
      formData.append('cant_med_mayoreo', productoUpdate.cant_med_mayoreo);

      if(this.imageFile != null){
        formData.append('image', this.imageFile);
      }else{
        formData.append('image', productoUpdate.image);
      }
      

    this.api.post('producto/edit', formData).subscribe(response => {
      if (response.status) {
        this.regresar();
        console.log('Usuario actualizado correctamente');
          this.openSnackBar();
      } else {
          console.error('Error al actualizar el producto:', response.message);
          alert('Error al actualizar el producto :C');
      }
    }, error => {
      // Maneja errores de la solicitud
      console.error('Error en la solicitud:', error);
    });

      
    }
  }

  regresar(){
    this.router.navigate(['../productos'], { relativeTo: this.activatedRoute });
  }

  private isFileAnImage(file: File): boolean {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', /* Agrega más tipos de imágenes si es necesario */];
    return allowedImageTypes.includes(file.type);
  }

}
