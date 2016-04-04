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
    public class CustomerController : ApiController
    {
        // GET: api/Customer
        public IEnumerable<customer> Get()
        {
            MotorcycleDBDataContext db = new MotorcycleDBDataContext();
            return db.customers.ToList();
        }

        // GET: api/Customer/5
        public customer Get(string id)
        {
            MotorcycleDBDataContext db = new MotorcycleDBDataContext();
            return db.customers.FirstOrDefault(customer => customer.username.Equals(id));
        }

        // POST: api/Customer
        public HttpResponseMessage Post([FromBody]customer cus)
        {
            try
            {
                MotorcycleDBDataContext db = new MotorcycleDBDataContext();
                var customer = new customer();
                customer.username = cus.username;
                customer.password = cus.password;
                customer.fullname = cus.fullname;
                customer.address = cus.address;
                customer.role = "user";
                db.customers.InsertOnSubmit(customer);
                db.SubmitChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // PUT: api/Customer/5
        public HttpResponseMessage Put(int id, [FromBody]customer cus)
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE: api/Customer/5
        public void Delete(int id)
        {
        }

        [Route("api/customer/login")]
        [HttpPost]
        public HttpResponseMessage login([FromBody]customer cus)
        {
            MotorcycleDBDataContext db = new MotorcycleDBDataContext();
            customer c = db.customers.FirstOrDefault(
                            customer => 
                            customer.username.Equals(cus.username) && 
                            customer.password.Equals(cus.password));
            HttpResponseMessage message = null;

            if (c == null)
            {
                message = Request.CreateResponse(HttpStatusCode.Unauthorized);
                
            } else
            {
                message = Request.CreateResponse(HttpStatusCode.OK);
            }

            return message;
        }
    }
}
