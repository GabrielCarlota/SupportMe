import { Time } from "@angular/common";

export interface Atendimentos{
  atendimento_Id: number,
  problemaApresentado: string,
  resolucaoDoProblema: string,
  data_Atendimento: Date,
  horario_Atendimento: Time,
  horario_Finalizacao: Time,
  data_Inclusao: Date,
  atendenteId: number,
  clienteId: number
}
