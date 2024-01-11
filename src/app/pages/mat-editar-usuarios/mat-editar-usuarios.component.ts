import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';

import { MatRegisterComponent } from '../mat-crear-usuarios/mat-register.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/models/interfaces/rol.interface';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { NotificadorComponent } from 'src/app/notificador/notificador.component';

@Component({
  selector: 'app-mat-editar-usuarios',
  templateUrl: './mat-editar-usuarios.component.html',
  styleUrls: ['./mat-editar-usuarios.component.scss']
})
export class MatEditarUsuariosComponent implements OnInit {


  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private notificadorRef:NotificadorComponent // Recibiendo los datos del usuario seleccionado
    ){}

  ngOnInit() {
    this.MostrarRoles();
    this.MostrarCajas();
    console.log("Usuario Dato:")
    console.log(this.data);
  }

  openSnackBar() {
    const message = 'Usuario Editado Correctamente'; 
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }

  usuario!: User;
  imagePreview: string = API_URL+'images/'+this.data.photo;
  imageFile!: File;
  rolList!: Rol[];
  nombre!:string;
  apellido!:string;
  password!:string;
  username!:string;
  id_rol!:string;
  imagen!:any;

  toggleChecked!: any;
  onToggleChange() {
    
    console.log('Estado cambiado:', this.toggleChecked);
  }

  registerForm= new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    estado: new FormControl(false, Validators.required),
    //confirmarContraseña: new FormControl('', Validators.required),
    rol: new FormControl(null, [Validators.required]),
  },);

  MostrarCajas(){
    this.toggleChecked = this.data.estado;
    this.registerForm.setValue({
      username: this.data.username,
      password : this.data.password || '',
      nombre: this.data.nombre,
      apellido: this.data.apellido,
      estado: this.toggleChecked,
      rol: this.data.id_rol || null,
    });
  }
  
  async MostrarRoles() {
    try{
      const rolList = await this.api.get('rol/list').toPromise();
      this.rolList = rolList.data;
      console.log(this.rolList);
    }catch(error){
      alert(error);
    }
  }


  actualizar() {
    if (this.registerForm.valid) {
      this.usuario = {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
        nombre: this.registerForm.get('nombre')?.value,
        apellido: this.registerForm.get('apellido')?.value,
        id_rol: this.registerForm.get('rol')?.value,
        estadoUsuario: this.registerForm.get('estado')?.value,
        photo: this.data.photo,
      };

      const formData = new FormData();
      formData.append('username', this.usuario.username);
      formData.append('password', this.usuario.password);
      formData.append('nombre', this.usuario.nombre);
      formData.append('apellido', this.usuario.apellido);
      formData.append('id_rol', this.usuario.id_rol);
      formData.append('estadoUsuario', this.usuario.estadoUsuario); // true
      formData.append('photo', this.usuario.photo);
      
      if(this.imageFile != null){
        formData.append('image', this.imageFile);
      }

    // Realiza la solicitud POST al servidor
    this.api.post('user/update', formData).subscribe(response => {
      // Maneja la respuesta del servidor
      if (response.status) {
        this.dialogRef.close();
        this.openSnackBar();
        console.log('Usuario actualizado correctamente');
      } else {
          console.error('Error al actualizar el usuario:', response.message);
      }
    }, error => {
      // Maneja errores de la solicitud
      console.error('Error en la solicitud:', error);
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

