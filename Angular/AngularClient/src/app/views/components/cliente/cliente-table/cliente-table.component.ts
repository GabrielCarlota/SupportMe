import { Clientes } from './../../../../interfaces/cliente';
import { Component, HostListener, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ClienteService } from '../../../../services/cliente.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Card } from 'primeng/card';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Select } from 'primeng/select';
import { Empresa } from '../../../../interfaces/empresa';
import { EmpresasService } from '../../../../services/empresas.service';
import { PanelModule } from 'primeng/panel';

interface Colunas {
  campo: string;
  cabecalho: string;
}

@Component({
  selector: 'app-cliente-table',
  standalone: true,
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
    Select,
    PanelModule,
  ],
  templateUrl: './cliente-table.component.html',
  styleUrl: './cliente-table.component.css',
  providers: [MessageService],
})
export class ClienteTableComponent implements OnInit {
  constructor(
    private es: EmpresasService,
    private cs: ClienteService,
    private fb: FormBuilder,
    private ms: MessageService,
    private route: Router
  ) {}

  empOptions: Empresa[] = [];

  dpOptions: string[] = ['S', 'N'];

  clientesList!: Clientes[];

  cols!: Colunas[];

  visivel: boolean = false;

  clientesForm!: FormGroup;

  editando: boolean = false;

  idClienteEditando: number | null = null;

  showDialogo() {
    this.visivel = true;
  }

  addCliente() {
    const cliente: Clientes = {
      clienteNome: this.clientesForm.value.clienteNome ?? '',
      clienteTelefone:
        this.clientesForm.value.clienteTelefone?.toString() ?? '',
      sintegra: this.clientesForm.value.sintegra ?? '',
      empresaId: Number(this.clientesForm.value.empresaId ?? 0),
    };

    if (this.editando && this.idClienteEditando !== null) {
      this.cs
        .putCliente(this.idClienteEditando, {
          clienteId: this.idClienteEditando,
          ...this.clientesForm.value,
        })
        .subscribe({
          next: (value) => {
            this.getClientes();
            this.resetarFormulario();
            this.ms.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Cliente alterado com sucesso',
              life: 2500,
            });
          },
          error: (err) => {
            console.log(err);
            this.ms.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Ocorreu um erro ao alterar o cliente selecionado',
              life: 2500,
            });
          },
        });
    } else {
      this.cs.postCliente(cliente).subscribe({
        next: (value) => {
          this.ms.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cliente incluido com sucesso',
            life: 5000,
          });
          this.getClientes();
          this.clientesForm.reset();
          this.visivel = false;
        },
        error: (err) => {
          this.ms.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.error?.message || 'Erro ao incluir o atendente.',
            life: 5000,
          });
          this.clientesForm.reset();
        },
      });
    }
  }

  cancelarForm() {
    this.clientesForm.reset();
    this.visivel = false;
  }

  deleteCliente(id: number) {
    this.cs.deleteCliente(id).subscribe({
      next: (value) => {
        this.ms.add({
          severity: 'info',
          summary: 'Sucesso',
          detail: 'Cliente Deletado com sucesso',
          life: 2500,
        });

        this.getClientes();
      },
      error: (err) => {
        this.ms.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error?.message || 'Não foi possivel realizar a exclusão',
          life: 5000,
        });
      },
    });
  }

  resetarFormulario() {
    this.clientesForm.reset();
    this.visivel = false;
    this.editando = false;
    this.idClienteEditando = null;
  }

  getClientes() {
    this.cs.getClientes().subscribe({
      next: (value) => {
        this.clientesList = value;
        this.ms.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Clientes carregados com sucesso',
          life: 5000,
        });
      },
      error: (err) => {
        this.ms.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error?.message || 'Erro ao carregar os clientes',
          life: 5000,
        });
      },
    });
  }

  exportXlsx() {
    const fileName = 'Clientedata.xlsx';

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

  ngOnInit(): void {
    this.es.getEmpresas().subscribe({
      next: (empresa) => {
        this.empOptions = empresa;
      },
    });

    this.cols = [
      { cabecalho: 'Id', campo: 'clienteId' },
      { cabecalho: 'Nome', campo: 'clienteNome' },
      { cabecalho: 'Telefone', campo: 'clienteTelefone' },
      { cabecalho: 'Sintegra', campo: 'sintegra' },
      { cabecalho: 'Empresa', campo: 'nomeEmpresa' },
    ];

    this.getClientes();

    this.clientesForm = this.fb.group({
      clienteNome: ['', Validators.required],
      clienteTelefone: ['', Validators.required],
      sintegra: ['', Validators.required],
      empresaId: ['', Validators.required],
      nomeEmpresa: ['', Validators.required],
    });
  }

  editCliente(cliente: Clientes) {
    this.clientesForm.patchValue({
      clienteNome: cliente.clienteNome,
      clienteTelefone: cliente.clienteTelefone,
      empresaId: cliente.empresaId,
      sintegra: cliente.sintegra,
    });

    this.visivel = true;
    this.editando = true;
    this.idClienteEditando = cliente.clienteId!;
  }
}
