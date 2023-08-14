using Microsoft.AspNetCore.Mvc;
using AppReact.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AppReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DbtestContext _dbContext;

        public EmployeeController(DbtestContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetEmployees")]
        public async Task<IActionResult> GetEmployees()
        {
            List<Employee> list = await _dbContext.Employees.OrderByDescending(c => c.IdEmployee).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, list);
        }

        [HttpPost]
        [Route("Save")]
        public async Task<IActionResult> Save([FromBody] Employee request)
        {
            await _dbContext.Employees.AddAsync(request);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit([FromBody] Employee request)
        {
            _dbContext.Employees.Update(request);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Employee employee = _dbContext.Employees.Find(id);

            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
