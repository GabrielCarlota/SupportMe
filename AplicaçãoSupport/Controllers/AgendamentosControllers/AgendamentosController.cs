using AplicaçãoSupport.Context;
using AplicaçãoSupport.Models;
using AplicaçãoSupport.Models.AgendamentosModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AplicaçãoSupport.Controllers.AgendamentosControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendamentosController : ControllerBase
    {

        private readonly AplicaçãoSupportDbContext _context;

        public AgendamentosController(AplicaçãoSupportDbContext context)
        {
            _context = context;
        }

        // GET: api/<AgendamentosController>

        [HttpGet]
        public ActionResult<IEnumerable<Agendamentos>> GetAgendamento()
        {
            try
            {
                var Agendamento = _context.Agendamentos.Take(50).ToList();
                if (Agendamento is null)
                {
                    return NotFound("Nenhum agendamento encontrado.");
                }
                return _context.Agendamentos;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Um erro ocorreu ao tentar executar a ação {ex}");
            }
        }


        // GET api/<AgendamentosController>/5
        [HttpGet("{id:int}", Name = "ObterAgendamento" )]
        public ActionResult<Agendamentos> Get(int id)
        {
            try
            {
                var Agendamento = _context.Agendamentos.FirstOrDefault(a => a.AgendamentoId == id);
                if (Agendamento == null)
                {
                    return NotFound("Não foi encontrado nenhum agendamento com este Id");
                }
                else
                {
                    return Agendamento;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Um erro ocorreu ao tentar executar a ação, {ex}");
            }
        }

        // POST api/<AgendamentosController>
        [HttpPost]
        public ActionResult Post(Agendamentos agendamentos)
        {
            try
            {
                if (agendamentos is null)
                {
                    return BadRequest();
                }
                else {
                    _context.Agendamentos.Add(agendamentos);
                    _context.SaveChanges();


                    return new CreatedAtRouteResult("ObterAgendamento",
                        new { id = agendamentos.AgendamentoId}, agendamentos);

                }
            }
            catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError,
                $"Um erro ocorreu ao tentar executar a ação {ex}");
            }

        }

        // PUT api/<AgendamentosController>/5
        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Agendamentos agendamentos)
        {
            try
            {
                if(id != agendamentos.AgendamentoId)
                {
                    return BadRequest();
                }

                    _context.Entry(agendamentos).State = EntityState.Modified;
                    _context.SaveChanges();

                    return Ok(agendamentos);

            }
            catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError,
                $"Um erro ocorreu ao tentar executar a ação {ex}");
            }

        }

        // DELETE api/<AgendamentosController>/5
        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var agendamentos = _context.Agendamentos.FirstOrDefault(i => i.AgendamentoId == id);

                if (agendamentos is null)
                {
                    return BadRequest();
                }
                if (id != agendamentos.AgendamentoId)
                {
                    return BadRequest();
                }

                _context.Agendamentos.Remove(agendamentos);
                _context.SaveChanges();

                return Ok("Agendamento deletado.");
            }
            catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   $"Um erro ocorreu ao tentar executar a ação {ex}");
            }
        }
    }
}
