using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AplicaçãoSupport.Models
{
    public class Atendimentos
    {
        [Key, Required]
        public int Atendimento_Id { get; set; }  

        [Required, MaxLength(500)]
        public string? ProblemaApresentado { get; set; }
        public string? ResolucaoDoProblema { get; set; }
        [Required]
        public DateTime Data_Atendimento { get; set; }
        [Required]
        public TimeOnly Horario_Atendimento { get; set; }
        [Required]
        public TimeOnly Horario_Finalizacao { get; set; }
        [Required]
        public DateTime Data_Inclusao { get; set; }

        public int AtendenteId { get; set; }
        [JsonIgnore]
        public Atendente? Atendente { get; set; }

        public int? ClienteId { get; set; }
        [JsonIgnore]
        public Clientes? Cliente { get; set; }


    }
}
