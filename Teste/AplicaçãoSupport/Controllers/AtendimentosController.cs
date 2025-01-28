using Microsoft.EntityFrameworkCore;
using AplicaçãoSupport.Context;
using AplicaçãoSupport.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AplicaçãoSupport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtendimentosController : ControllerBase
    {
        private readonly AplicaçãoSupportDbContext _context;    

        public AtendimentosController(AplicaçãoSupportDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Atendimentos>> Get()
        {
            var atendimentos = _context.Atendimentos.Take(15).ToList();
            if (atendimentos is null)
            {
                return NotFound();
            }
            return _context.Atendimentos;
        }


        [HttpGet("{id:int}", Name = "ObterAtendimento")]
        public ActionResult Get(int id)
        {
            var atendimentos = _context.Atendimentos.FirstOrDefault(a => a.Atendimento_Id == id);

            if(atendimentos is null)
            {
                return NotFound("Não existe(m) atendimentos com este id");
            }
            return Ok(atendimentos);

        }

        [HttpPost]
        public ActionResult Post(Atendimentos atendimentos)
        {
            if (atendimentos is null)
            {
                return BadRequest();
            }

            _context.Atendimentos.Add(atendimentos);
            _context.SaveChanges();

            return new CreatedAtRouteResult("ObterAtendimento", 
            new {id = atendimentos.Atendimento_Id}, atendimentos);

        }

        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Atendimentos atendimentos)
        {
            if(id != atendimentos.Atendimento_Id)
            {
                return BadRequest("Um erro ocorreu ao editar os dados!");
            }

            _context.Entry(atendimentos).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok(atendimentos);    
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var atendimentos = _context.Atendimentos.FirstOrDefault(a => a.Atendimento_Id == id);
            if (atendimentos is null)
            {
                return NotFound();
            }
            if (id != atendimentos.Atendimento_Id) {
                return BadRequest();
                    }

            _context.Remove(atendimentos);
            _context.SaveChanges();
            return Ok(atendimentos);

        }
    }
}
