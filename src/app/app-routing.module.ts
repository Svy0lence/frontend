import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/landingPage', pathMatch:'full'
  },
  {
    path:'landingPage', component: RegistrarComponent
  },
  {path:'**', component: NopageFoundComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
