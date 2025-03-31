import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TestComponent } from './components/test/test.component';
import { ClientesFormComponent } from './components/clientes-form/clientes-form.component';
import { AtendimentosFormComponent } from './components/atendimentos-form/atendimentos-form.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path:"",
    redirectTo:'registro', pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'homePage', component: HomePageComponent },
      { path: 'atendimentos', component: AtendimentosFormComponent },
      { path: 'clientes', component: ClientesFormComponent },
      { path: 'testes', component: TestComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
];
