using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SanaCommerce_Test.Server.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "The FirstName must be less than 100 characters")]
        public string FirstName { get; set; }

        [MaxLength(100, ErrorMessage = "The LastName must be less than 100 characters")]
        public string? LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string? Address { get; set; }

        [MaxLength(150)]
        public string PasswordHash { get; set; }

        [NotMapped]
        [PasswordPropertyText]
        public string Password { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
