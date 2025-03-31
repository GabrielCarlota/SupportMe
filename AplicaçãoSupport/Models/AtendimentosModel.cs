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
        public string? Cliente_Atendido { get; set; }
        [Required]
        public DateTime Data_Atendimento { get; set; }
        [Required]
        public TimeOnly Horario_Atendimento { get; set; }
        [Required]
        public DateTime Data_Inclusao { get; set; }
        public int? EmpresaId { get; set; }
        [JsonIgnore]
        public Empresa? Empresa { get; set; }

        public int AtendenteId { get; set; }
        [JsonIgnore]
        public Atendente? Atendente { get; set; }

    }
}
