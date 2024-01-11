import { Component, OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService){

  }
  ngOnInit(): void {
    this.ocultarPorCincoSegundos();
    this.openSpinner();
  }
  
  mostrarDiv = true;
  
  ocultarPorCincoSegundos() {
    this.mostrarDiv = false;
    setTimeout(() => {
      this.mostrarDiv = true;
    }, 1000); // 5000 milisegundos = 5 segundos
  }
   openSpinner(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },1500)
   }

}
