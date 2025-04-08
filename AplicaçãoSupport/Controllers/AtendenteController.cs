using AplicaçãoSupport.Context;
using AplicaçãoSupport.Helpers;
using AplicaçãoSupport.Models;
using Microsoft.AspNetCore.Identity;
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
            try
            {
                var Atendente = _context.Atendente.FirstOrDefault(p => p.AtendenteId == id);
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

        [HttpPost("Registro")]
        public ActionResult Post(Atendente atendente)
        {
            try
            {
                if (atendente is null)
                {
                    return BadRequest();
                }
                 
                atendente.Senha = Hasher.HashPassword(atendente.Senha);
                
                _context.Atendente.Add(atendente);
                _context.SaveChanges();

                return new CreatedAtRouteResult("ObterAtendente",
                    new { id = atendente.AtendenteId }, atendente);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Um erro ocorreu ao tentar executar a ação {ex}");
            }

        }

        [HttpPost("Login")]
        public async Task<IActionResult> Autenticate([FromBody] Atendente atendente)
        {
            if (atendente is null)
            {
                return BadRequest();
            }


            var atendenteLogin = await _context.Atendente.
                FirstOrDefaultAsync(a => a.NomeAtendente == atendente.NomeAtendente);

            if (atendenteLogin == null)
            {
                return Unauthorized("Verfique os dados incluidos");
            }

            bool verified = Hasher.Verify(atendente.Senha, atendenteLogin.Senha);

            if (!verified)
            {
                return BadRequest($"Senha incorreta para o usuario {atendenteLogin.NomeAtendente}");
            }

            return Ok(new
            {
                Message = $"Usuário {atendenteLogin.NomeAtendente} logado com sucesso"
            });
        }


        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Atendente atendente)
        {
            try
            {

                if (id != atendente.AtendenteId)
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

                var atendente = _context.Atendente.FirstOrDefault(p => p.AtendenteId == id);

                if (id != atendente.AtendenteId)
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
