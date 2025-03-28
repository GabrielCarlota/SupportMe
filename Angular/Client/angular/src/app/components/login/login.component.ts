import { Router, RouterLink } from '@angular/router';
import { routes } from './../../app.routes';
import { UsersService } from './../../services/users.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Atendente } from '../../types/users';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  usuarios!: Observable<Atendente[]>;
  ServicoUsuario = inject(UsersService);

  constructor(private fb: FormBuilder, private router: Router, private toast: ToastrService) {}

  ngOnInit(): void {
    this.ServicoUsuario.getUsers().subscribe({
      next: (res) => {
        console.log(res);
      },

      error: (err) => {
        console.log(err?.err.error);
      },
    });

    try {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
      console.log('Componente inicializado');
    } catch (error) {
      console.error('Erro no ngOnInit:', error);
    }
  }

  EscondeMostraSenha() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
    this.type = this.isText ? 'text' : 'password';



  }
  OnSumbit() {
    if(this.loginForm.invalid){
      alert("Preencha com os dados corretamente");
    }

    const usuario = this.loginForm.get('username')?.value
    const senha = this.loginForm.get('password')?.value

    const data: Atendente = {
      Nome_Atendente: usuario,
      Senha: senha
    }

    this.ServicoUsuario.login(data).subscribe({
      next: (res) =>{
        console.log('Login Bem-Sucedido', res);
        this.router.navigateByUrl('homePage');
        this.toast.success("Usuario logado com sucesso!", "Sucesso", {closeButton: true})
      },
      error: (err) => {
        console.log('Erro ao fazer o login', err);
        this.toast.error("Favor verificar o login e senha", "Erro",{closeButton: true});
      },
    })

  }

  ToLogin(){
    this.router.navigateByUrl('registro');
  }
}
