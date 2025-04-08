using AplicaçãoSupport.Context;
using AplicaçãoSupport.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Configuration;
using System.Net.WebSockets;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AplicaçãoSupport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {

        private readonly AplicaçãoSupportDbContext _context;

        public ClientesController(AplicaçãoSupportDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetEmpresas")]
        public ActionResult<IEnumerable<Clientes>> GetClientesEmpresa()
        {
            var clientes = _context.Clientes
                .Include(c => c.Empresa)
                .Select(c => new
                {
                    IdCliente   = c.ClienteId,
                    NomeCliente = c.ClienteNome,
                    IdEmpresa   = c.EmpresaId,
                    NomeEmpresa = c.Empresa.Nome_Empresa,

                });

            return Ok(clientes);
        }


        // GET: api/<ClientesController>
        [HttpGet]
        public ActionResult<IEnumerable<Clientes>> Get()
        {
            try
            {
                var cliente = _context.Clientes.Take(50).ToList();
                if (cliente is null)
                {
                    return NotFound("Não foi encontrado nenhum cliente");

                }
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                $"Um erro ocorreu ao tentar executar a ação {ex}");
            }
        }

        // GET api/<ClientesController>/5
        [HttpGet("{id:int}", Name="ObterCliente")]
        public ActionResult<Clientes> Get(int id)
        {
            try
            {
                var cliente = _context.Clientes.FirstOrDefault(c => c.ClienteId == id);
                if (cliente is null)
                {
                    return NotFound();
                }
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                $"Um erro ocorreu ao tentar executar a ação {ex}");
            }
        }

        // POST api/<ClientesController>
        [HttpPost]
        public ActionResult<Clientes> Post(Clientes clientes)
        {
            try
            {
                if (clientes is null)
                {
                    return BadRequest("Um erro ocorreu ao incluir o Cliente");
                }

                var empresa = _context.Empresa.FirstOrDefault(e => e.EmpresaId == clientes.EmpresaId);

                if (empresa is null)
                {
                    return NotFound("A empresa não foi encontrada");
                }

                clientes.Empresa = empresa;

                _context.Clientes.Add(clientes);
                _context.SaveChanges();

                return new CreatedAtRouteResult("ObterCliente",
                    new {id = clientes.ClienteId},
                    new
                    {
                        Mensagem = $"O cliente {clientes.ClienteNome} foi incluido na empresa {empresa.Nome_Empresa} de codigo {empresa.EmpresaId}",
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                $"Um erro ocorreu ao tentar executar a ação {ex}");
            }
        }

        // PUT api/<ClientesController>/5
        [HttpPut("{id:int}")]
        public ActionResult<Clientes> Put(int id, Clientes clientes)
        {
            try
            {
                if( clientes is null)
                {
                    return BadRequest();
                }

                _context.Entry(clientes).State = EntityState.Modified; 
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                $"Um erro ocorreu ao tentar executar a ação {ex}");
            }
        }

        // DELETE api/<ClientesController>/5
        [HttpDelete("{id}")]
        public ActionResult<Clientes> Delete(int id)
        {
            try
            {
                var clientes = _context.Clientes.FirstOrDefault(c => c.ClienteId == id);

                if(clientes == null)
                {
                    return NotFound("Não foi encontrado nenhum cliente para ser deletado \n" +
                        "Favor verificar se o cliente já havia sido deletado");
                }
                if(id != clientes.ClienteId)
                {
                    return BadRequest("Favor revisar os dados e tentar deletar novamente");
                }

                _context.Clientes.Remove(clientes);
                _context.SaveChanges();
                return Ok();


            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                $"Um erro ocorreu ao tentar executar a ação {ex}");
            }
        }
    }
}
