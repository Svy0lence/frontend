import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('rotateImage', [
      state('login', style({
        transform: 'rotate(360deg)'
      })),
      transition('* => login', animate('1000ms ease-out'))
    ]),
    trigger('changeBackground', [
      state('normal', style({
        backgroundColor: 'transparent'
      })),
      state('whiteBackground', style({
        backgroundColor: '#ffffff'
      })),
      transition('normal => whiteBackground', animate('3000ms'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  showError: boolean = false
  messageError: string = ''
  someState: string = 'normal';
  showImage: boolean = false;

  usuario!: string;
  password!: string; // Variable para almacenar la contraseña
  showPassword: boolean = false; // Variable para controlar la visibilidad de la contraseña
  isLoading: boolean = true;
  backgroundState: string = 'normal';
  loginForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });


  constructor(private api: ApiService, private router: Router){
  }

  ngOnInit(): void {
  }

  onShowError(message: string):void {
    this.showError = true;
    this.messageError = message 
  }

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    this.isLoading = true;
    this.someState = 'login'; // Cambia a true para indicar inicio de carga
  
    const { username, password } = this.loginForm.value;
    this.api.post('auth/login', { username, password }).subscribe(
      (response) => {
        console.log(response)
        const user = {
          id: response.data.id,
          photo: response.data.photo,
          id_rol: response.data.id_rol,
          username: response.data.username,
        }
        
        localStorage.setItem('currentUser', JSON.stringify(user));

        this.isLoading = false;
        this.router.navigate(['/system/dashboard']);
      },
      (error) => {
        // Manejar errores en la solicitud
        //alert(error.error.message);
        this.onShowError(error.error.message)
        this.isLoading = false;
         // Cambia a false después de un error
      }
    );  
  }

  


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  } 

  
}

