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
import { Title } from '@angular/platform-browser';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {Title:'Login'}
  },
  {
    path: 'registro',
    component: RegisterComponent,
    data: {Title:'Registro'}
  },
  {
    path:'teste',
    component:TestesComponent
  },
  {
    path:'404', component:NotFoundComponent,
    data: {title:'Not Found'}
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
        data:{title: 'Cadastro de Clientes'}
      },
      {
        path: 'empresas',
        component: EmpresaComponent,
        data:{title: 'Cadastro de Empresas'}
      },
      {
        path: 'atendimentos',
        component: AtendimentosComponent,
        data:{title: 'Movimentação Atendimentos'}
      },
    ],
  },
];
