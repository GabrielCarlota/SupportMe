import { Routes } from '@angular/router';
import { LoginComponent } from './views/components/login/login/login.component';
import { LayoutComponent } from './views/components/layout/layout.component';
import { HomepageComponent } from './views/components/homepage/homepage.component';
import { TestesComponent } from './views/components/testes/testes.component';
import { ClienteComponent } from './views/components/cliente/cliente/cliente.component';
import { EmpresaComponent } from './views/components/empresa/empresa/empresa.component';
import { AtendimentosComponent } from './views/components/atendimentos/atendimentos/atendimentos.component';
import { RegisterComponent } from './views/components/register/register/register.component';
import { NotFoundComponent } from './views/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegisterComponent,
  },
  {
    path:'teste',
    component:TestesComponent 
  },
  {
    path:'404', component:NotFoundComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'homepage',
        component: HomepageComponent,
      },
      {
        path: 'testes',
        component: TestesComponent,
      },
      {
        path: 'clientes',
        component: ClienteComponent,
      },
      {
        path: 'empresas',
        component: EmpresaComponent,
      },
      {
        path: 'atendimentos',
        component: AtendimentosComponent,
      },
    ],
  },
];
