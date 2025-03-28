import { routes } from './../../app.routes';
import { Component, createNgModule, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Atendente } from '../../types/users';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  RegisterForm!: FormGroup;

  ConfPass: string = 'ConfSenha';

  usuarios!: Observable<Atendente[]>;
  ServicoUsuario = inject(UsersService);

  EscondeMostraSenha() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
    this.type = this.isText ? 'text' : 'password';
  }
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
      this.RegisterForm = this.fb.group({
        id: [],
        username: ['', Validators.required],
        password: ['', Validators.required],
        ConfPassword: ['', Validators.required],
      });
      console.log('Componente inicializado');
    } catch (error) {
      console.error('Erro no ngOnInit:', error);
    }
  }

  ToLogin(){
    this.router.navigateByUrl('login');
    return;
  }

  onSubmit() {
    const usuario = this.RegisterForm.get('username')?.value;
    const senha = this.RegisterForm.get('password')?.value;
    const confSenha = this.RegisterForm.get('ConfPassword')?.value;

    if (!usuario) {
      console.log('Favor, fornecer um usuario valido');
      return;
    } else {
      if (senha === confSenha) {
        const data: Atendente = {
          Nome_Atendente: this.RegisterForm.get('username')?.value,
          Senha: this.RegisterForm.get('ConfPassword')?.value,
        };

        if (senha != confSenha) {
          console.log('As senhas não combinam');
        }

        if (!senha) {
          console.log('Favor fornecer uma senha');
          return;
        }
        if (!confSenha) {
          console.log('Favor confirmar a senha');
          return;
        }

        console.log(data);

        if (!data || null) {
          location.reload();
          console.log('Erro');
        } else {
          this.ServicoUsuario.addUser(data).subscribe((res) =>
            console.log(res)
          );
          this.router.navigateByUrl('/login');
        }
      }
    }
  }
}
