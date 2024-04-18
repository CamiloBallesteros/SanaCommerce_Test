using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SanaCommerce_Test.Server.Data;
using SanaCommerce_Test.Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SanaCommerce_Test.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductsController> _logger;
        public ProductsController(ApplicationDbContext context, ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/<ProductsController>
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, await _context.Products.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, await _context.Products.FirstOrDefaultAsync(o => o.Id == id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
    }
}
