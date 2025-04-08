using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AplicaçãoSupport.Models
{
    public class Atendimentos
    {
        [Key, Required]
        public int AtendimentoId { get; set; }  

        [Required, MaxLength(500)]
        public string? ProblemaApresentado { get; set; }
        public string? ResolucaoDoProblema { get; set; }
        [Required]
        public DateTime DataAtendimento { get; set; }
        [Required]
        public TimeOnly HorarioAtendimento { get; set; }
        [Required]
        public TimeOnly HorarioFinalizacao { get; set; }
        [Required]
        public DateTime DataInclusao { get; set; }

        public int AtendenteId { get; set; }
        [JsonIgnore]
        public Atendente? Atendente { get; set; }

        public int? ClienteId { get; set; }
        [JsonIgnore]
        public Clientes? Cliente { get; set; }


    }
}
