using AplicaçãoSupport.Models;
using AplicaçãoSupport.Context;
using Microsoft.EntityFrameworkCore;
using AplicaçãoSupport.Controllers;
using AplicaçãoSupport.Models.AgendamentosModels;

namespace AplicaçãoSupport.Context
{
    public class AplicaçãoSupportDbContext : DbContext
    {
        public AplicaçãoSupportDbContext(DbContextOptions<AplicaçãoSupportDbContext> options) : base(options) { 
        
        }

        public DbSet<Atendente> Atendente { get; set; }
        public DbSet<Atendimentos> Atendimentos { get; set; }
        public DbSet<Empresa> Empresa { get; set; }
        public DbSet<Agendamentos> Agendamentos { get; set; }
        public DbSet<Clientes> Clientes { get; set; }
    }
}
