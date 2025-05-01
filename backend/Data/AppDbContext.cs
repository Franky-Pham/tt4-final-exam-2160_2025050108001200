using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) {}
    
    public DbSet<Book> Books { get; set; }
  }
}
