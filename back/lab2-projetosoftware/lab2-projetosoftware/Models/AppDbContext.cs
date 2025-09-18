using Microsoft.EntityFrameworkCore;

namespace lab2_projetosoftware.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Cliente> Clientes { get; set; }
    }
}
