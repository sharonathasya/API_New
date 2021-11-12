using API_New.Repository.Interface;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API_New.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("AllowOrigin")]
    public class BaseController<Entity, Repository, Key> : ControllerBase
        where Entity : class
        where Repository : IRepository<Entity, Key>
    {
        private readonly Repository repository;
        public BaseController(Repository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public ActionResult<Entity> Get()
        {
            var result = repository.Get();
            if (result.ToList().Count > 0)
            {
                return Ok(result);
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = "Tidak ada data di tabel" });
        }

        [HttpGet("{key}")]
        public ActionResult Get(Key key)
        {
            var exist = repository.Get(key);
            if (exist != null)
            {
                return Ok(exist);
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = exist, message = "Data dengan ID tersebut tidak ditemukan" });
        }

        [HttpPost]
        public ActionResult Post(Entity entity)
        {
            try
            {
                var result = repository.Insert(entity);


                return Ok(result);
            }
            catch 
            {

                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data tidak berhasil ditambahkan. ID sudah terdaftar" });
            }
        }

        [HttpPut("{Key}")]
        public ActionResult Update(Entity entity, Key key)
        {
            try
            {
                var result = repository.Update(entity, key);
                return Ok(result);
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data tidak berhasil diupdate. ID sudah terdaftar" });
            }
        }

        [HttpDelete("{key}")]
        public ActionResult<Entity> Delete(Key key)
        {
            var exist = repository.Get(key);
            try
            {
                var result = repository.Delete(key);
                return Ok(result);
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data tidak dapat ditemukan" });
            }
        }
    }
}
