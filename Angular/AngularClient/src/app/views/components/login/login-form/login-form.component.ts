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

@Component({
  selector: 'app-login-form',
  imports: [
    FloatLabel, CardModule, FormsModule,
    ButtonModule,AutoFocusModule,FocusTrapModule,
    IconFieldModule,InputIconModule,InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private servicoAtendente: AtendenteService
  ) {}

  atendenteList!: Atendente[];

  accept: boolean = false;

  loginForm = new FormGroup({
    nome_Atendente: new FormControl(''),
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

  loginClicked() {
    const att: Atendente = {
      nome_Atendente: this.loginForm.value.nome_Atendente ?? '',
      senha: this.loginForm.value.senha ?? '',
    };

    console.log(this.loginForm.value);

    this.servicoAtendente.loginAtendentes(att).subscribe({
      next: (res) => console.log('Login bem-sucedido:', res),
      error: (err) => console.error('Erro no login:', err),
    });
  }
}
