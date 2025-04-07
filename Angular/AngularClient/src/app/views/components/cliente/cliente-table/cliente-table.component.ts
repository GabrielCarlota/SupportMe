import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'
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
import { Clientes } from '../../../../interfaces/cliente';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface Colunas{
  campo:string,
  cabecalho:string
}

interface ExportData{
  cabecalho:string,
  dataKey:string
}

@Component({
  selector: 'app-cliente-table',
  standalone:true,
  imports: [
    TableModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    Toast,
    Card
  ],
  templateUrl: './cliente-table.component.html',
  styleUrl: './cliente-table.component.css',
  providers:[MessageService]
})

export class ClienteTableComponent implements OnInit {

  constructor(
    private cs: ClienteService,
    private fb: FormBuilder,
    private ms: MessageService,
    private route: Router
  ) {}

  clientesList!: Clientes[]

  cols!: Colunas[]

  visivel: boolean = false;

  clientesForm!: FormGroup;

  exportData!: ExportData[];

  showDialogo() {
    this.visivel = true;
  }

  addCliente() {
    const novoCliente: Clientes = {
      clienteNome: this.clientesForm.value.clienteNome ?? '',
      clienteTelefone: this.clientesForm.value.clienteTelefone?.toString() ?? '',
      sintegra: this.clientesForm.value.sintegra??'',
      empresaId: Number(this.clientesForm.value.empresaId ??0),
    };

    this.cs.postCliente(novoCliente).subscribe({
      next: (value) => {
        this.ms.add({
          severity:'success',
          summary:"Sucesso",
          detail:"Cliente incluido com sucesso",
          life:5000
        })
        this.getClientes()
        this.clientesForm.reset()
      },
      error:(err) => {
        this.ms.add({
          severity:'error',
          summary:"Erro",
          detail: err.error?.message || "Erro ao incluir o atendente.",
          life:5000
        })
      },
    });
  }

  cancelarForm(){
    this.clientesForm.reset()
  }

  getClientes(){
    this.cs.getClientes().subscribe({next:(value)=> {
      console.log(value);
      this.clientesList = value;
      this.ms.add({
        severity:'success',
        summary:"Sucesso",
        detail:"Clientes carregados com sucesso",
        life:5000
      })
    },
  error:(err)=>{
    console.log(err);
    this.ms.add({
      severity:'error',
      summary:"Erro",
      detail: err.error?.message || "Erro ao carregar os clientes",
      life:5000
    })
  },})
  }


  exportXlsx(){
    const fileName = "Clientedata.xlsx"

    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Pagina 1');

    XLSX.writeFile(wb,fileName)
  }

  ngOnInit(): void {

    this.cols = [
      {cabecalho:'Id', campo:'clienteId'},
      {cabecalho:'Nome', campo:'clienteNome'},
      {cabecalho:'Telefone', campo:'clienteTelefone'},
      {cabecalho:'Sintegra', campo:'sintegra'},
      {cabecalho:'Empresa', campo:'empresaId'}
    ];

    this.getClientes();

    this.clientesForm = this.fb.group({
      clienteNome: ['', Validators.required],
      clienteTelefone: ['', Validators.required],
      sintegra:['', Validators.required],
      empresaId: ['', Validators.required],
    });
  }
}
