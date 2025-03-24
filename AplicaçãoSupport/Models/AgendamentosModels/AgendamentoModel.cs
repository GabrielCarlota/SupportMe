using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AplicaçãoSupport.Models.AgendamentosModels
{
    public class Agendamentos
    {
        [Key]
        public int AgendamentoId { get; set; }  
        public int AtendenteId { get; set; }
        [JsonIgnore]
        public Atendente? Atendente { get; set; }
        public int ClienteId { get; set; }
        [JsonIgnore]
        public Clientes? Cliente { get; set; }
        public DateTime? DataDoAgendamento { get; set; }
        public DateTime? DataDaRealizacao { get; set; }
        public string? MotivoAgendamento { get; set; }
        public char Realizado { get; set; }
        public DateTime DataInclusao { get; set; }

    }
}
