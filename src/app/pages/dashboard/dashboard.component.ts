import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,state } from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform: 'translateX(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(300,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  
  showImage: boolean = false;
  constructor(private api: ApiService){
  }

  ngOnInit(): void {
    // Después de 5 segundos, mostrar la imagen vibrante y ocultar el contenido inicial
    setTimeout(() => {
      this.showImage = true;
    }, 1000); // 5000 milisegundos = 5 segundos
  }

 
}
  
  


