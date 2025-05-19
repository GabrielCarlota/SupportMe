import { Component, HostListener, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Card } from 'primeng/card';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Empresa } from '../../../../interfaces/empresa';
import { EmpresasService } from '../../../../services/empresas.service';
import { FloatLabel } from 'primeng/floatlabel';
import { AtendimentoService } from '../../../../services/atendimento.service';
import { Atendimentos } from '../../../../interfaces/atendimentos';
import { ClienteService } from '../../../../services/cliente.service';
import { Clientes } from '../../../../interfaces/cliente';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePicker } from 'primeng/datepicker';
import { CalendarModule } from 'primeng/calendar'

interface Colunas {
  campo: string;
  cabecalho: string;
}

@Component({
  selector: 'app-atendimentos-form',
  imports: [
    TableModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    Toast,
    Card,
    FloatLabel,
    Select,
    TextareaModule,
    DatePicker,
    CalendarModule
  ],
  templateUrl: './atendimentos-form.component.html',
  styleUrl: './atendimentos-form.component.css',
})
export class AtendimentosFormComponent implements OnInit {
  constructor(
    private as: AtendimentoService,
    private cs: ClienteService,
    private fb: FormBuilder,
    private ms: MessageService,
    private route: Router
  ) {}

  atendenteAtual = localStorage.getItem('atendenteId');

  atendimentosList!: Atendimentos[];

  formGroup: FormGroup | undefined;

  attClientesOptions: Clientes[] = [];

  clientes!: Clientes[];

  cols!: Colunas[];

  visivel: boolean = false;

  atendimentosForm!: FormGroup;

  editando: boolean = false;

  currDate = Date.now

  idEditando: number | null = null;

  ngOnInit(): void {
    this.cs.getClientes().subscribe({
      next: (value) => {
        this.attClientesOptions = value;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.cols = [
      { cabecalho: 'Id', campo: 'atendimentoId' },
      { cabecalho: 'Empresa', campo: 'empresaId' },
      { cabecalho: 'Atendente', campo: 'atendenteId' },
      { cabecalho: 'Cliente', campo: 'clienteId' },
      { cabecalho: 'Problema', campo: 'problemaApresentado' },
      { cabecalho: 'Resolução', campo: 'resolucaoDoProblema' },
      { cabecalho: 'Realização', campo: 'dataAtendimento' },
      { cabecalho: 'Inclusão', campo: 'dataInclusao' },
      { cabecalho: 'Resolução', campo: 'resolucaoDoProblema' },
    ];

    this.formGroup = new FormGroup({});

    this.atendimentosForm = this.fb.group({
      problemaApresentado: ['', Validators.required],
      resolucaoDoProblema: ['', Validators.required],
      dataAtendimento: ['', Validators.required],
      horarioAtendimento: ['', Validators.required],
      horarioFinalizacao: ['', Validators.required],
      dataInclusao: ['', Validators.required],
      atendenteId: ['', Validators.required],
      clienteId: ['', Validators.required],
    });

    this.getAtendimentos();
  }

  addAtendimento() {
    const atendimento: Atendimentos = {
      clienteId: this.atendimentosForm.value.clienteId ?? '',
      problemaApresentado: this.atendimentosForm.value.problemaApresentado ?? '',
      resolucaoDoProblema: this.atendimentosForm.value.resolucaoDoProblema ?? '',
      dataAtendimento: this.atendimentosForm.value.dataAtendimento ?? '',
      dataInclusao: new Date??'',
      atendenteId: this.atendenteAtual = JSON.parse(localStorage.getItem('atendenteAtual')!),
    }
}

  getAtendimentos() {
    this.as.getAtendimentos().subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  exportXlsx() {
    const fileName = 'AtendimentosData.xlsx';

    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pagina 1');

    XLSX.writeFile(wb, fileName);
  }

  @HostListener('window:keydown.control.a', ['$event'])
  shortAdd(event: KeyboardEvent) {
    event.preventDefault();
    this.visivel = true;
  }
  @HostListener('window:keydown.control.q', ['$event'])
  shortClose(event: KeyboardEvent) {
    event.preventDefault();
    this.visivel = false;
  }

  cancelarForm() {
    this.atendimentosForm.reset();
    this.visivel = false;
  }

  showDialogo() {
    this.visivel = true;
  }

  resetarFormulario() {
    this.atendimentosForm.reset();
    this.visivel = false;
    this.editando = false;
    this.idEditando = null;
  }
}
