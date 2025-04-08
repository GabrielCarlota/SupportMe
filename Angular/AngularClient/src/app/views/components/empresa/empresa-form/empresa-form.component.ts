import { Clientes } from './../../../../interfaces/cliente';
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

interface Colunas {
  campo: string;
  cabecalho: string;
}

@Component({
  selector: 'app-empresa-form',
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
  ],
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.css',
  providers: [MessageService],
})
export class EmpresaFormComponent implements OnInit {
  empresasList!: Empresa[];

  empresaForm!: FormGroup;

  cols!: Colunas[];

  visivel: boolean = false;

  editando: boolean = false;

  idEditando: number | null = null;

  constructor(
    private es: EmpresasService,
    private fb: FormBuilder,
    private ms: MessageService,
    private route: Router
  ) {}

  cancelarForm() {
    this.empresaForm.reset();
    this.visivel = false;
  }

  showDialogo() {
    this.visivel = true;
  }

  resetarFormulario() {
    this.empresaForm.reset();
    this.visivel = false;
    this.editando = false;
    this.idEditando = null;
  }

  addEmpresa() {
    const empresa: Empresa = {
      empresaId: Number(this.empresaForm.value.empresaId ?? 0),
      nome_Empresa: this.empresaForm.value.nome_Empresa ?? '',
    };

    if (this.editando && this.idEditando !== null) {
      this.es
        .putEmpresa(this.idEditando, {
          empresaId: this.idEditando,
          ...this.empresaForm.value,
        })
        .subscribe({
          next: (value) => {
            this.getEmpresa();
            this.resetarFormulario();
            this.ms.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Empresa alterado com sucesso',
            });
          },
          error: (err) => {
            this.ms.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Um erro ocorreu ao alterar a Empresa',
            });
            this.visivel = false;
          },
        });
    } else {
      this.es.postEmpresa(empresa).subscribe({
        next: (value) => {
          this.ms.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Empresa incluida com sucesso',
            life: 5000,
          });
          this.getEmpresa();
          this.resetarFormulario();
          this.visivel = false;
        },
        error: (err) => {
          this.ms.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.error?.message || 'Erro ao incluir a Empresa.',
            life: 5000,
          });
        },
      });
    }
  }

  getEmpresa() {
    this.es.getEmpresas().subscribe({
      next: (value) => {
        this.empresasList = value;
        this.ms.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Empresas carregadas com sucesso',
          life: 2000,
        });
      },
      error: (err) => {
        this.ms.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar os clientes',
          life: 2000,
        });
      },
    });
  }

  deleteEmpresa(id: number) {
    this.es.deleteEmpresa(id).subscribe({
      next: (value) => {
        this.getEmpresa()
        this.ms.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Clientes carregados com sucesso',
          life: 2000,
        });
      },
      error: (err) => {
        console.log(err);
        this.ms.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error?.message || 'Erro ao carregar os clientes',
          life: 2000,
        });
      },
    });
  }

  editEmpresa(empresa: Empresa) {
    this.empresaForm.patchValue({
      empresaId: empresa.empresaId,
      nome_Empresa: empresa.nome_Empresa,
    });
    this.visivel = true;
    this.editando = true;
    this.idEditando = empresa.empresaId;
  }

  ngOnInit(): void {
    this.getEmpresa();
    this.cols = [
      { cabecalho: 'Id', campo: 'empresaId' },
      { cabecalho: 'Nome', campo: 'nome_Empresa' },
    ];

    this.empresaForm = this.fb.group({
      nome_Empresa: ['', Validators.required],
    });
  }

  exportXlsx() {
    const fileName = 'EmpresaData.xlsx';

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
}
