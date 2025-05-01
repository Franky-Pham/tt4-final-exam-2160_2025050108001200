using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _db;
        public BooksController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetAll()
            => Ok(await _db.Books.ToListAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetOne(int id)
        {
            var b = await _db.Books.FindAsync(id);
            return b == null ? NotFound() : Ok(b);
        }

        [HttpPost]
        public async Task<ActionResult<Book>> Create(Book b)
        {
            _db.Books.Add(b);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetOne), new { id = b.Id }, b);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Book b)
        {
            if (id != b.Id) return BadRequest();
            _db.Entry(b).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var b = await _db.Books.FindAsync(id);
            if (b == null) return NotFound();
            _db.Books.Remove(b);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
