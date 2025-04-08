import { Time } from "@angular/common";

export interface Atendimentos{
  atendimentoId: number,
  problemaApresentado: string,
  resolucaoDoProblema: string,
  dataAtendimento: Date,
  horarioAtendimento: Time,
  horarioFinalizacao: Time,
  dataInclusao: Date,
  atendenteId: number,
  clienteId: number
}
