import { Atendente } from './../../../../interfaces/atendente';
import { Component, OnInit } from '@angular/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { Router, RouterLink } from '@angular/router';
import { AtendenteService } from '../../../../services/atendente.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-register-form',
  imports: [
    Toast,
    FloatLabel,
    CardModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    AutoFocusModule,
    FocusTrapModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
    DividerModule,
    SplitterModule,
    PasswordModule,
    FloatLabelModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  providers: [MessageService],
})
export class RegisterFormComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private atendenteService: AtendenteService,
    private router: Router,
    private fb: FormBuilder,
    private ms: MessageService
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group(
      {
        nome_Atendente: ['', Validators.required],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confSenha: ['', Validators.required],
      },
      { validator: this.senhasCoincidem }
    );
  }

  senhasCoincidem(fg: FormGroup) {
    const senha = fg.get('senha')?.value;
    const confSenha = fg.get('confSenha')?.value;
    return senha === confSenha ? null : { senhasNaoCoincidem: true };
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  registroClicked() {
    const novoAtendente: Atendente = {
      nome_Atendente: this.registroForm.value.nome_Atendente ?? '',
      senha: this.registroForm.value.senha ?? '',
    };

    this.atendenteService.registroAtendentes(novoAtendente).subscribe({
      next: (value) => {
        this.ms.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Atendente registrado com sucesso!',
        });
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.ms.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao registrar atendente. Tente novamente.',
          life:5000,
          sticky:true
        });
        console.error('Erro ao registrar atendente:', err);
      },
    });
  }
}
