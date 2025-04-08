import { Component, OnInit } from '@angular/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { Atendente } from '../../../../interfaces/atendente';
import { HttpClient } from '@angular/common/http';
import { AtendenteService } from '../../../../services/atendente.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-login-form',
  imports: [
    FloatLabel,
    CardModule,
    FormsModule,
    ButtonModule,
    AutoFocusModule,
    FocusTrapModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  providers: [MessageService],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private servicoAtendente: AtendenteService,
    private route: Router,
    private ms: MessageService
  ) {}

  atendenteList!: Atendente[];

  accept: boolean = false;

  loginForm = new FormGroup({
    nomeAtendente: new FormControl(''),
    senha: new FormControl(''),
  });

  ngOnInit(): void {
    this.servicoAtendente.getAtendentes().subscribe({
      next: (value) => {
        this.atendenteList = value;
        console.log(value);
      },
      error(err) {
        console.log(err?.err.error);
      },
    });
  }

  toRegister(){
    this.route.navigate(['/registro'])
  }

  loginClicked() {
    const att: Atendente = {
      nomeAtendente: this.loginForm.value.nomeAtendente ?? '',
      senha: this.loginForm.value.senha ?? '',
    };

    console.log(this.loginForm.value);

    this.servicoAtendente.loginAtendentes(att).subscribe({
      next: (res) => {
        console.log('Login bem-sucedido:', res);
        this.ms.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login Efetuado com sucesso',
          life: 5000,
        });
        this.route.navigate(['homepage']);
      },
      error: (err) => {
        this.ms.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Um erro ocorreu ao efetuar o login',
          life: 5000,
        });
        console.error('Erro no login:', err);
      },
    });
  }
}
