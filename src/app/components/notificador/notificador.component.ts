import {Component, Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../materials/snack-bar/snack-bar.component';

@Component({
  selector: 'app-notificador',
  templateUrl: './notificador.component.html',
  styleUrls: ['./notificador.component.scss'],
})

@Injectable({
  providedIn: 'root',
})
export class NotificadorComponent {
  

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, image?: string, durationSeconds?:number) {
    let durationInSeconds = 5;
    durationInSeconds = durationSeconds
    
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message, image },
      duration: durationInSeconds * 1000,
    });
  }
}