import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/interfaces/user.interface';
import { Rol } from 'src/app/models/interfaces/rol.interface';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { MostrarRolActive } from 'src/app/utils/GetCmb';



function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmarPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    console.log('Contraseñas no coinciden');
    return { passwordMismatch: true };
  }

  return null;
}


@Component({
  selector: 'app-mat-crear-usuarios',
  templateUrl: './mat-crear-usuarios.component.html',
  styleUrls: ['./mat-crear-usuarios.component.scss']
})

export class MatCrearUsuariosComponent implements OnInit {
  usuario!: User;
  imagePreview!: string;
  imageFile!: File;
  rolList!: Rol[];
  
  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatCrearUsuariosComponent>, private notificadorRef:NotificadorComponent){
  }

  openSnackBar(message: string) {
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }
 
  registerForm= new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    confirmarPassword: new FormControl('', Validators.required),
    rol: new FormControl(null, [Validators.required]),
  },
     {validators: passwordMatchValidator}
  );

  ngOnInit():void {
   this.MostrarRoles();
  }

  async MostrarRoles() {
    try{
      this.rolList = await MostrarRolActive(this.api);
      console.log(this.rolList);
    }catch(error){
      alert(error);
    }
  }

  registrar() {
   
    if (this.registerForm.valid) {
      this.usuario = {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
        nombre: this.registerForm.get('nombre')?.value,
        apellido: this.registerForm.get('apellido')?.value,
        id_rol: this.registerForm.get('rol')?.value
      };

      console.log('Usuario:', this.usuario);
      console.log('Image File:', this.imageFile);

      // Crea un FormData y agrega el usuario como cadena JSON
      const formData = new FormData();
      formData.append('username', this.usuario.username);
      formData.append('password', this.usuario.password);
      formData.append('nombre', this.usuario.nombre);
      formData.append('apellido', this.usuario.apellido);
      formData.append('id_rol', this.usuario.id_rol);

      
        if(this.imageFile != null){
          formData.append('image', this.imageFile);
        }

        // console.log(formData);

        this.api.post('user/create', formData).subscribe(response => {
          // Maneja la respuesta del servidor
          if (response.status) {

            this.dialogRef.close();
            this.openSnackBar('Usuario Creado Correctamente');

          } else {
            this.openSnackBar('Error al crear el usuario: ' + response.message);
          }
        }, error => {
          this.openSnackBar('Error en la solicitud:'+ error.message);
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