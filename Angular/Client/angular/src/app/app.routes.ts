import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  {
    path:"",
    redirectTo:'registro', pathMatch:'full'
  },
  {
    path:'homePage',
    component:HomePageComponent
  },
  {
    path:'Teste',
    component:TestComponent
  },
  {
    path:'users',
    component:UsersComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'registro',
    component:RegistroComponent
  }
];
