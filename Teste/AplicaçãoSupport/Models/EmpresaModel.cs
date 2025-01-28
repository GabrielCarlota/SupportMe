﻿using Microsoft.VisualBasic;
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
        }
        
        [Key]
        public int EmpresaId { get; set; }
        public string? Nome_Empresa { get; set; }
        [JsonIgnore]
        public ICollection<Atendimentos>? Atendimentos { get; set; }

    }
}
