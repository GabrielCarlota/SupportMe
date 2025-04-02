import { Atendente } from './../../../../interfaces/atendente';
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
import { Router, RouterLink } from '@angular/router';
import { AtendenteService } from '../../../../services/atendente.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [
    FloatLabel, CardModule, FormsModule,
    ButtonModule,AutoFocusModule,FocusTrapModule,
    IconFieldModule,InputIconModule,InputTextModule,
    ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit{

  constructor(private atendenteService: AtendenteService, private router: Router){}

  ngOnInit(): void {

  }

  registroForm = new FormGroup({
    atendente_Id: new FormControl(0),
    nome_Atendente: new FormControl(''),
    senha: new FormControl('')
  })

  registroClicked(){
    const novoAtendente: Atendente = {
      nome_Atendente: this.registroForm.value.nome_Atendente??'',
      senha: this.registroForm.value.senha??''
    }

    this.atendenteService.registroAtendentes(novoAtendente).subscribe({
      next:(value)=> console.log('Registro bem sccedido',value),
      error(err) {
        console.log(err);
      }
    })
    this.router.navigateByUrl('/login');
  }
}
