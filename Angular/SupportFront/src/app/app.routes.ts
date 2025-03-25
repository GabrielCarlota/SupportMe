import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { FormAtendimentosComponent } from './components/atendimentos/form-atendimentos.component';
import { FormAgendamentosComponent } from './components/agendamentos/form-agendamentos.component';

export const routes: Routes = [
  {path:'login' , component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'atendimentos', component: FormAtendimentosComponent},
  {path: 'agendamentos', component: FormAgendamentosComponent},
];

