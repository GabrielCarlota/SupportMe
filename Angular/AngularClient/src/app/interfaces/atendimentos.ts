export interface Atendimentos{
  atendimentoId?: number,
  problemaApresentado: string,
  resolucaoDoProblema: string,
  dataAtendimento: Date,
  dataInclusao: Date,
  atendenteId: number,
  clienteId: number
  atendenteNome?: string,
  clienteNome?:string,
  clienteEmpresa?:string,

}
