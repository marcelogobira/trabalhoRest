using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using TrabalhoRest.Data;
using TrabalhoRest.Data.AppDB;
using TrabalhoRest.Models;

namespace TrabalhoRest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public UserController(AppDb db)
        {
            Db = db;
        }

        // GET api/user
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]int page = 1
                , [FromQuery]int limit = 10)
        {
            try
            {
                await Db.Connection.OpenAsync();
                var query = new UserQuery(Db);
                var result = await query.FindAllAsync();
                var lastPageNumber = ((result.Count - 1) / limit) + 1;

                page = page >= lastPageNumber ? lastPageNumber : page;

                result = result.Skip((page - 1) * limit)
                .Take(limit)
                .ToList();

                if(result is null)
                {
                    return new NotFoundResult();
                }

                var previousPageNumber = page > 1 ? page - 1 : 1;
                var nextPageNumber = page + 1 >= lastPageNumber ? lastPageNumber : page + 1;

                var pager = new Pager<User>(){
                     NextPage = new Uri(string.Format("/user/?page={0}&limit={1}", nextPageNumber, limit)),
                     PreviousPage = new Uri(string.Format("/user/?page={0}&limit={1}", previousPageNumber, limit)),
                     Items = result,
                     CurrentPageNumber = page,
                     LastPageNumber = lastPageNumber
                };

                return new OkObjectResult(pager);
            }
            catch(Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }

        }

        // GET api/user/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            try
            {
                await Db.Connection.OpenAsync();
                var query = new UserQuery(Db);
                var result = await query.FindOneAsync(id);

                if (result is null){
                    return new NotFoundResult();
                }

                return new OkObjectResult(result);
            }
            catch(Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpGet("cpf/{cpf}")]
        public async Task<IActionResult> GetByCpf(string cpf)
        {
            try
            {
                await Db.Connection.OpenAsync();
                var query = new UserQuery(Db);
                var result = await query.FindOneByCpfAsync(cpf);

                if (result is null){
                    return new NotFoundResult();
                }

                return new OkObjectResult(result);
            }
            catch(Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }


        // POST api/user
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User body)
        {
            try
            {
                await Db.Connection.OpenAsync();
                body.Db = Db;

                if(!body.ValidarCPF()){
                    var result = new JsonResult(new {
                        Message = "O número do CPF fornecido não é válido."
                    });
                    result.StatusCode = (int)HttpStatusCode.BadRequest;

                    return new BadRequestObjectResult(result);
                }

                await body.InsertAsync();

                return new CreatedResult("Get", body);
            }
            catch(Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        // PUT api/user/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOne(int id, [FromBody]User body)
        {
            try
            {
                await Db.Connection.OpenAsync();
                var query = new UserQuery(Db);
                var result = await query.FindOneAsync(id);

                if (result is null){
                    return new NotFoundResult();
                }

                result.CPF = body.CPF;
                result.Name = body.Name;
                await result.UpdateAsync();
                return new OkObjectResult(result);
            }
            catch(Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        // DELETE api/user/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOne(int id)
        {
            try
            {
                await Db.Connection.OpenAsync();
                var query = new UserQuery(Db);
                var result = await query.FindOneAsync(id);

                if (result is null){
                    return new NotFoundResult();
                }

                await result.DeleteAsync(id);
                return new OkResult();
            }
            catch(Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        // DELETE api/user
        [HttpDelete]
        public async Task<IActionResult> DeleteAll()
        {
            try
            {
                await Db.Connection.OpenAsync();
                var query = new UserQuery(Db);
                await query.DeleteAllAsync();
                return new OkResult();
            }
            catch(Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        public AppDb Db { get; }
    }
}
