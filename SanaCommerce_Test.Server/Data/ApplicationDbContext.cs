using Microsoft.EntityFrameworkCore;
using SanaCommerce_Test.Server.Models;

namespace SanaCommerce_Test.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Order_Detail> Order_Details { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity => { 
                entity
                    .HasIndex(p => p.Code)
                    .IsUnique();
                entity.Property(p => p.Price)
                    .HasColumnType("money");
            });

            modelBuilder.Entity<Order>(entity => {
                entity.Property(p => p.OrderDate)
                    .HasColumnType("datetime");
                entity.Property(p => p.Total)
                    .HasColumnType("money");
            });

            modelBuilder.Entity<Order_Detail>(entity => {
                entity.ToTable("Order_Details", tb => tb.HasTrigger("trgOrderCreated"));

                entity.Property(p => p.UnitPrice)
                    .HasColumnType("money");
                entity.Property(p => p.SubTotal)
                    .HasColumnType("money");
            });

            modelBuilder.Entity<Customer>(entity => {
                entity.Property(p => p.PasswordHash)
                    .HasColumnType("binary");
            });
        }
    }
}
