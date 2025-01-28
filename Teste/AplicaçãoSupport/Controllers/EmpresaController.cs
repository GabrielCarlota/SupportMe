using AplicaçãoSupport.Context;
using AplicaçãoSupport.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AplicaçãoSupport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly AplicaçãoSupportDbContext _context;

        public EmpresaController(AplicaçãoSupportDbContext context)
        {
            _context = context;
        }    

        [HttpGet]
        public ActionResult<IEnumerable<Empresa>> Get()
        {
            var empresa = _context.Empresa.Take(15).ToList();
            if (empresa is null) { 
                return NotFound();
            }
            return empresa;
        }

        [HttpGet("{id:int}", Name = "ObterEmpresa")]
        public ActionResult<Empresa> GetById(int id)
        {
            var empresa = _context.Empresa.FirstOrDefault(p => p.EmpresaId == id);
            if (empresa is null)
            {
                return NotFound("Não foi encontrado nenhuma empresa com este ID");
            }
            return empresa;
        }

        [HttpPost]
        public ActionResult Post(Empresa empresa)
        {
            if (empresa is null)
            {
                return BadRequest();
            }

            _context.Empresa.Add(empresa);
            _context.SaveChanges();

            return new CreatedAtRouteResult("ObterEmpresa",
                new { id = empresa.EmpresaId }, empresa);
        }

        [HttpPut("{id:int}")]
        public ActionResult Put(int id,Empresa empresa)
        {
            if(id != empresa.EmpresaId)
            {
                return BadRequest("Ocorreu um erro na edição");
            }
            
            _context.Entry(empresa).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok(empresa);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var empresa = _context.Empresa.FirstOrDefault(p => p.EmpresaId == id);
            if (id != empresa.EmpresaId)
            {
                return BadRequest("Um erro ocorreu ao deletar a empresa");
            }
            if (empresa is null)
            {
                return NotFound();
            }

            _context.Empresa.Remove(empresa);
            _context.SaveChanges();
            return Ok();
        }
    }
}
