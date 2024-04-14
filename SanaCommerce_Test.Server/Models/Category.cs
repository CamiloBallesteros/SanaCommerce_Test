using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SanaCommerce_Test.Server.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(70, ErrorMessage = "The Name must be less than 70 characters")]
        public string Name { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
