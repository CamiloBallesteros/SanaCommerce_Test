using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SanaCommerce_Test.Server.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(40, ErrorMessage = "The Code must be less than 40 characters")]
        [MinLength(3, ErrorMessage = "The Code must have more than 3 characters")]
        public string Code { get; set; }

        [Required]
        [MaxLength(150, ErrorMessage = "The Title must be less than 150 characters")]
        public string Title { get; set; }
        public string? Description { get; set; }

        [DataType(DataType.Currency)]
        public decimal Price { get; set; }
        public int Stock { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }
    }
}
