using AplicaçãoSupport.Context;
using AplicaçãoSupport.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
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

        [HttpPost("Login")]
        public async Task <IActionResult> Autenticate([FromBody]Atendente atendente)
        {
            if(atendente is null)
            {
                return BadRequest();
            }

            var atendenteLogin = await _context.Atendente
                .FirstOrDefaultAsync(x => x.Nome_Atendente == atendente.Nome_Atendente && x.Senha == atendente.Senha);

            if(atendenteLogin == null)
            {
                return Unauthorized();
            }
            return Ok(new
            {
                Message = "Usuario/a logado com sucesso"
            });
        }
        
        // GET api/<AtendenteController>/5
        [HttpGet("{id:int}", Name ="ObterAtendente")]
        public ActionResult<Atendente> Get(int id)
        {
            try
            {
                var Atendente = _context.Atendente.FirstOrDefault(p => p.Atendente_Id == id);
                if (Atendente == null)
                {
                    return NotFound("Não foi encontrado nenhum atendente com este ID");
                }
                return Atendente;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Um erro ocorreu ao tentar executar a ação {ex}");
            }


        }

        [HttpPost]
        public ActionResult Post(Atendente atendente)
        {
            try
            {
                if (atendente is null)
                {
                    return BadRequest();
                }

                _context.Atendente.Add(atendente);
                _context.SaveChanges();

                return new CreatedAtRouteResult("ObterAtendente",
                    new { id = atendente.Atendente_Id }, atendente);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Um erro ocorreu ao tentar executar a ação {ex}");
            }

        }

        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Atendente atendente)
        {
            try
            {

                if (id != atendente.Atendente_Id)
                {
                    return BadRequest();
                }

                _context.Entry(atendente).State = EntityState.Modified;
                _context.SaveChanges();

                return Ok(atendente);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Um erro ocorreu ao tentar executar a ação {ex}");
            }


        }

        // DELETE api/<AtendenteController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {

                var atendente = _context.Atendente.FirstOrDefault(p => p.Atendente_Id == id);

                if (id != atendente.Atendente_Id)
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
            catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError,
                $"Um erro ocorreu ao tentar executar a ação {ex}");
            }
            
        }
    }
}
