using AplicaçãoSupport.Models;
using AplicaçãoSupport.Context;
using Microsoft.EntityFrameworkCore;
using AplicaçãoSupport.Controllers;

namespace AplicaçãoSupport.Context
{
    public class AplicaçãoSupportDbContext : DbContext
    {
        public AplicaçãoSupportDbContext(DbContextOptions<AplicaçãoSupportDbContext> options) : base(options) { 
        
        }

        public DbSet<Atendente> Atendente { get; set; }
        public DbSet<Atendimentos> Atendimentos { get; set; }
        public DbSet<Empresa> Empresa { get; set; }
    }
}
