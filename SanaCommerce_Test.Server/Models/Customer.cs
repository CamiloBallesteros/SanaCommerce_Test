using System.ComponentModel.DataAnnotations;

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

        public virtual ICollection<Order> Orders { get; set; }
    }
}
