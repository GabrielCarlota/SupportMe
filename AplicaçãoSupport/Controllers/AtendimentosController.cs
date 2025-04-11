using Microsoft.EntityFrameworkCore;
using AplicaçãoSupport.Context;
using AplicaçãoSupport.Models;
using Microsoft.AspNetCore.Mvc;


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
        public async Task<ActionResult<IEnumerable<Atendimentos>>> Get()
        {
            var atendimentos = _context.Atendimentos.Take(15).ToList();
            if (atendimentos is null)
            {
                return NotFound();
            }
            return Ok(await _context.Atendimentos.ToListAsync());
        }

        [HttpGet("AtendimentosFullData")]
        public async Task<ActionResult<IEnumerable<Atendimentos>>> GetAtendimentosMaisDados()
        {
            var atendimentos = _context.Atendimentos.Include(a => a.Cliente).Select(a => new {
                AtendimentoId = a.AtendimentoId,
                ProblemaApresentado = a.ProblemaApresentado,
                ResolucaoDoProblema = a.ResolucaoDoProblema,
                DataAtendimento = a.DataAtendimento,
                DataInclusao = a.DataInclusao,
                AtendenteId = a.AtendenteId,
                AtendenteNome = a.Atendente.NomeAtendente,
                ClienteId = a.ClienteId,
                ClienteNome = a.Cliente.ClienteNome,
                ClienteEmpresa = a.Cliente.Empresa.NomeEmpresa
            });

            return Ok(await atendimentos.ToListAsync());
        }


        [HttpGet("{id:int}")]
        public ActionResult Get(int id)
        {
            var atendimentos = _context.Atendimentos.FirstOrDefault(a => a.AtendimentoId == id);

            if(atendimentos is null)
            {
                return NotFound("Não existe(m) atendimentos com este id");
            }
            return Ok(atendimentos);

        }

        [HttpPost]
        public async Task<ActionResult> Post(Atendimentos atendimentos)
        {
            if (atendimentos is null)
            {
                return BadRequest();
            }

            _context.Atendimentos.Add(atendimentos);
            _context.SaveChanges();

            return Ok(await _context.Atendimentos.ToListAsync());

        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, Atendimentos atendimentos)
        {
            if(id != atendimentos.AtendimentoId)
            {
                return BadRequest("Um erro ocorreu ao editar os dados!");
            }

            _context.Entry(atendimentos).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok(await _context.Atendimentos.ToListAsync());    
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var atendimentos = _context.Atendimentos.FirstOrDefault(a => a.AtendimentoId == id);
            if (atendimentos is null)
            {
                return NotFound();
            }
            if (id != atendimentos.AtendimentoId) {
                return BadRequest();
                    }

            _context.Remove(atendimentos);
            _context.SaveChanges();
            return Ok(await _context.Atendimentos.ToListAsync());

        }
    }
}
