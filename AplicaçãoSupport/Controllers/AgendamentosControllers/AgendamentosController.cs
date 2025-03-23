using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AplicaçãoSupport.Controllers.AgendamentosControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendamentosController : ControllerBase
    {
        // GET: api/<AgendamentosController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AgendamentosController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AgendamentosController>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<AgendamentosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<AgendamentosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
