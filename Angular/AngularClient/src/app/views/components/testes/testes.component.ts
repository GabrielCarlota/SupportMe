import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { Divider } from 'primeng/divider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBar } from 'primeng/progressbar';
import { ClienteService } from '../../../services/cliente.service';
import { Clientes } from '../../../interfaces/cliente';
import { Toast } from 'primeng/toast';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-testes',

  imports: [
    TableModule,
    HttpClientModule,
    CommonModule,
    InputTextModule,
    TagModule,
    SelectModule,
    MultiSelectModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,

  ],
  providers: [ClienteService, Toast, MessageService],
  standalone: true,
  templateUrl: './testes.component.html',
  styleUrl: './testes.component.css',
})
export class TestesComponent implements OnInit {
  customers!: Clientes[];

  ngOnInit(): void {
    
  }
}
