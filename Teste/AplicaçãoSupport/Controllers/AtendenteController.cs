using AplicaçãoSupport.Context;
using AplicaçãoSupport.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;


namespace AplicaçãoSupport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtendenteController : ControllerBase
    {
        private readonly AplicaçãoSupportDbContext _context;

        public AtendenteController(AplicaçãoSupportDbContext context)
        {
            _context = context;
        }


        [HttpGet("Atendimentos")]
        public ActionResult<IEnumerable<Atendente>> GetAtendentesAtendimentos()
        {
            try
            {
                return _context.Atendente.Include(a => a.Atendimentos).Where(a => a.Atendente_Id <= 15).ToList();

            }
            catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Um erro ocorreu ao solicitar a ação{ex}");
            }
        }

        // GET: api/<AtendenteController>
        [HttpGet]
        public ActionResult<IEnumerable<Atendente>> GetAtendente()
        {
            try
            {
                var Atendentes = _context.Atendente.Take(15).ToList();
                if (Atendentes is null)
                {
                    return NotFound("Nenhum atendente cadastrado");
                }
                return _context.Atendente;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Um erro ocorreu ao tentar executar a ação {ex}");
            }
        }

        // GET api/<AtendenteController>/5
        [HttpGet("{id:int}", Name ="ObterAtendente")]
        public ActionResult<Atendente> Get(int id)
        {
            var Atendente = _context.Atendente.FirstOrDefault(p=> p.Atendente_Id == id);
            if (Atendente == null)
            {
                return NotFound("Não foi encontrado nenhum atendente com este ID");
            }
            return Atendente;
        }

        // POST api/<AtendenteController>
        [HttpPost]
        public ActionResult Post(Atendente atendente)
        {
            if (atendente is null) {
                return BadRequest();
            }

            _context.Atendente.Add(atendente);
            _context.SaveChanges();

            return new CreatedAtRouteResult("ObterAtendente",
                new {id = atendente.Atendente_Id}, atendente);
            
        }

        // PUT api/<AtendenteController>/5
        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Atendente atendente)
        {
            if (id != atendente.Atendente_Id)
            {
                return BadRequest();
            }

            _context.Entry(atendente).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(atendente);

        }

        // DELETE api/<AtendenteController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var atendente = _context.Atendente.FirstOrDefault(p => p.Atendente_Id == id);

            if(id != atendente.Atendente_Id)
            {
                return BadRequest();
            }
            if (atendente is null)
            {
                return NotFound();
            }

            _context.Atendente.Remove(atendente);
            _context.SaveChanges();

            return Ok("Atendente deletado.");
        }
    }
}
