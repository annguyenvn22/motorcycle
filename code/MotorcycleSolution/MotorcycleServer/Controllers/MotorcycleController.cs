
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MotorcycleServer.Controllers
{
    [EnableCors("*", "*", "*", SupportsCredentials = true)]
    public class MotorcycleController : ApiController
    {
        // GET: api/Motorcycle
        public IEnumerable<motorcycle> Get()
        {
            MotorcycleDBDataContext db = new MotorcycleDBDataContext();
            return db.motorcycles.ToList();
        }

        // GET: api/Motorcycle/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Motorcycle
        public HttpResponseMessage Post([FromBody]motorcycle m)
        {
            try
            {
                MotorcycleDBDataContext db = new MotorcycleDBDataContext();
                var motor = new motorcycle();
                motor.name = m.name;
                motor.img_url = m.img_url;
                motor.is_sold = false;
                motor.price = m.price;
                motor.color = m.color;
                motor.type = m.type;
                motor.supplier = m.supplier;
                
                db.motorcycles.InsertOnSubmit(motor);
                db.SubmitChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // PUT: api/Motorcycle/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Motorcycle/5
        public void Delete(int id)
        {
        }
    }
}
