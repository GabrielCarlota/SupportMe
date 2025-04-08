using Microsoft.VisualBasic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AplicaçãoSupport.Models
{
    public class Empresa
    {
        public Empresa() {
            Atendimentos = new Collection<Atendimentos>();
            Clientes = new Collection<Clientes>();
        }
        
        [Key]
        public int EmpresaId { get; set; }
        public string? NomeEmpresa { get; set; }
        [JsonIgnore, NotMapped]
        public ICollection<Atendimentos>? Atendimentos { get; set; }
        [JsonIgnore]
        public ICollection<Clientes> Clientes { get; set; }
    }
}
