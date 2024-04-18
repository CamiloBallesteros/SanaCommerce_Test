using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SanaCommerce_Test.Server.Models;
using System.Data;

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

        public int PAddCustomer(string firstName, string email, string password, string? lastName = null, string? address = null)
        {
            int customerId = 0;

            var customerIdOutputParam = new SqlParameter("@Id", SqlDbType.Int) { Direction = ParameterDirection.Output };
            var firstNameParam = new SqlParameter("@FirstName", (object)firstName ?? DBNull.Value);
            var lastNameParam = new SqlParameter("@LastName", (object)lastName ?? DBNull.Value);
            var emailParam = new SqlParameter("@Email", (object)email ?? DBNull.Value);
            var addressParam = new SqlParameter("@Address", (object)address ?? DBNull.Value);
            var passwordParam = new SqlParameter("@Password", (object)password ?? DBNull.Value);
            Database.ExecuteSqlRaw("EXEC dbo.AddCustomer @Id OUTPUT, @FirstName, @LastName, @Email, @Address, @Password",
                customerIdOutputParam, firstNameParam, lastNameParam, emailParam, addressParam,passwordParam
            );

            if (customerIdOutputParam.Value != DBNull.Value)
            {
                customerId = Convert.ToInt32(customerIdOutputParam.Value);
            }

            return customerId;
        }

        public int PUsrLogin(string email, string password)
        {
            int customerId = 0;

            var emailParam = new SqlParameter("@Email", (object)email ?? DBNull.Value);
            var passwordParam = new SqlParameter("@Password", (object)password ?? DBNull.Value);
            var customerIdOutputParam = new SqlParameter("@CustomerId", SqlDbType.Int) { Direction = ParameterDirection.Output };

            Database.ExecuteSqlRaw("EXEC dbo.UsrLogin @Email, @Password, @CustomerId OUTPUT",
                emailParam, passwordParam, customerIdOutputParam
            );

            if (customerIdOutputParam.Value != DBNull.Value)
            {
                customerId = Convert.ToInt32(customerIdOutputParam.Value);
            }

            return customerId;
        }
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
