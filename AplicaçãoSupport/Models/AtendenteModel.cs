using AplicaçãoSupport.Models.AgendamentosModels;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace AplicaçãoSupport.Models
{
    public class Atendente
    {
        public Atendente() { 
            Atendimentos = new Collection<Atendimentos>();
        }

        [Key]
        public int Atendente_Id { get; set; }
        [MaxLength(100)]
        [NotNull]
        public string? Nome_Atendente { get; set; }

        public string? Senha { get; set; }
        [JsonIgnore]
        public ICollection<Atendimentos> Atendimentos { get; set; }
        

    }
}
