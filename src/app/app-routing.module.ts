import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { LoginComponent } from './login/login.component';
import { PagesGuard } from './guards/pages.guard';

const routes: Routes = [
  {
    path:'', redirectTo:'/login', pathMatch:'full'
  },
  {
    path:'login', component: LoginComponent, canActivate: [PagesGuard]
  },
  {path:'**', component: NopageFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
