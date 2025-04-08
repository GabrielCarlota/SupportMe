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
            Atendimentos = new Collection<Atendimentos>();
        }

        [Key]
        public int ClienteId { get; set; }
        public string? ClienteNome { get; set; }
        public string? ClienteTelefone { get; set; }
        public char Sintegra {  get; set; }
        public int EmpresaId { get; set; }
        [JsonIgnore]
        public Empresa? Empresa { get; set; }
        [JsonIgnore]
        public ICollection<Agendamentos> Agendamentos { get; set; }
        [JsonIgnore]
        public ICollection<Atendimentos> Atendimentos { get; set; }
    }
}
