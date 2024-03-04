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
  
  showImage: boolean = true;

  productoTotal: Number = 0;
  modeloTotal: Number = 0;
  marcaTotal: Number = 0;
  tallaTotal: Number = 0;

  constructor(private api: ApiService){
  }

  ngOnInit(): void {
    this.getDashboard()
  }

 

  async getDashboard() {
    
    const result = await this.api.get('dashboard/list').toPromise();

    this.productoTotal = result.data.countProducto
    this.modeloTotal = result.data.countModelos
    this.marcaTotal = result.data.countMarcas
    this.tallaTotal = result.data.countTalla
    this.showImage = false;
  }


}
  
  


