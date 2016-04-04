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
    public class InvoiceController : ApiController
    {
        // GET: api/Invoice
        public IEnumerable<invoice> Get()
        {
            MotorcycleDBDataContext db = new MotorcycleDBDataContext();
            return db.invoices.ToList();
        }

        // GET: api/Invoice/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Invoice
        public HttpResponseMessage Post([FromBody]invoice i)
        {
            try
            {
                MotorcycleDBDataContext db = new MotorcycleDBDataContext();
                var invoice = new invoice();
                invoice.customer = i.customer;
                invoice.total_price = i.total_price;
                invoice.date_created = DateTime.Now;
                invoice.is_resolved = false;

                db.invoices.InsertOnSubmit(invoice);
                db.SubmitChanges();

                var invoiceId = new
                {
                    id = invoice.id
                };

                return Request.CreateResponse(HttpStatusCode.OK, invoiceId);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // PUT: api/Invoice/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Invoice/5
        public void Delete(int id)
        {
        }
    }
}
