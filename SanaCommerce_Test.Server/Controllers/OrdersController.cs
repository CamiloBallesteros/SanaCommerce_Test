using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SanaCommerce_Test.Server.Data;
using SanaCommerce_Test.Server.Models;

namespace SanaCommerce_Test.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<OrdersController> _logger;
        public OrdersController(ApplicationDbContext context, ILogger<OrdersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/<OrdersController>
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, _context.Orders.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET api/<OrdersController>/5
        [HttpGet("{id}")]
        public Order Get(int id)
        {
            return _context.Orders.FirstOrDefault(o => o.Id == id) ?? new Order();
        }

        // POST api/<OrdersController>
        [HttpPost]
        [Route("ProcessOrder")]
        public async Task<IActionResult> PostProcessOrder([FromBody] Order_Detail[] details, [FromQuery] int customerId)
        {
            try
            {
                var newOrder = new Order { CustomerId = customerId, OrderDate = DateTime.Now, Total = details.Sum(x => x.SubTotal) };
                _context.Orders.Add(newOrder);

                if ((await _context.SaveChangesAsync()) > 0)
                {
                    foreach(var item in details)
                    {
                        item.OrderId = newOrder.Id;
                    }
                    await _context.Order_Details.AddRangeAsync(details);
                    if ((await _context.SaveChangesAsync()) > 0)
                        return StatusCode(StatusCodes.Status200OK, newOrder.Id);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "The order could not be processed.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
