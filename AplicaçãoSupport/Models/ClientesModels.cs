using AplicaçãoSupport.Models.AgendamentosModels;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AplicaçãoSupport.Models
{
    public class Clientes
    {
        public Clientes() { 
            Agendamentos = new Collection<Agendamentos>();
        }

        [Key]
        public int ClienteId { get; set; }
        public string? ClienteNome { get; set; }
        public string? ClienteTelefone { get; set; }
        public int EmpresaId { get; set; }
        [JsonIgnore]
        public Empresa? Empresa { get; set; }
        public ICollection<Agendamentos> Agendamentos { get; set; }
    }
}
