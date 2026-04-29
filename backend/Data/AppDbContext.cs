using Microsoft.EntityFrameworkCore;
using backend.Models;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Tool> Tools { get; set; }
}

