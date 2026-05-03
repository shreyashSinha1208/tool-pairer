using Microsoft.EntityFrameworkCore;
using backend.Models;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Tool> Tools { get; set; }
    public DbSet<Hub> Hubs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasOne(u => u.MyHub)
            .WithMany(h => h.Residents)
            .HasForeignKey(u => u.HubId);

        modelBuilder.Entity<Tool>()
            .HasOne(t => t.Owner)
            .WithMany(u => u.OwnedTools)
            .HasForeignKey(t => t.OwnerId);
    }
}

