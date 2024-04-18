using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SanaCommerce_Test.Server.Data;
using SanaCommerce_Test.Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SanaCommerce_Test.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CustomersController> _logger;
        public CustomersController(ApplicationDbContext context, ILogger<CustomersController> logger)
        {
            _context = context;
            _logger = logger;
        }
        // GET: api/<CustomersController>
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, _context.Customers.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CustomersController>/Login
        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LoginDataModel login)
        {
            try
            {
                var customerId = _context.PUsrLogin(login.Email, login.Password);
                if (customerId > 0)
                {
                    return StatusCode(StatusCodes.Status200OK, customerId);
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, 0);
                    // "El usuario y/o contraseña ingresados estan incorrectos."
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // POST api/<CustomersController>/Register
        [HttpPost]
        [Route("Register")]
        public IActionResult Login([FromBody] RegisterDataModel registerData)
        {
            try
            {
                var customerId = _context.PAddCustomer(registerData.FirstName, registerData.Email, registerData.Password, registerData.LastName, registerData.Address);
                if(customerId > 0)
                {
                    return StatusCode(StatusCodes.Status200OK, customerId);
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, 0);
                    // "El usuario no pudo ser creado."
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
