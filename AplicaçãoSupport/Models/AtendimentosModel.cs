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
        public string? Problema { get; set; }
        public string? Cliente_Atendido { get; set; }
        [Required]
        public DateTime Data_Atendimento { get; set; }
        [Required]
        public DateTime Data_Inclusão { get; set; }
        public int? EmpresaId { get; set; }
        [JsonIgnore]
        public Empresa? Empresa { get; set; }

        public int AtendenteId { get; set; }
        [JsonIgnore]
        public Atendente? Atendente { get; set; }

    }
}
