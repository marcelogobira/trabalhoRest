using System.Data;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MySqlConnector;
using TrabalhoRest.Data.AppDB;

namespace TrabalhoRest.Models
{
    public class Address{

        public int Id { get; set; }

        public string Street { get; set; }

        public string Number { get; set; }

        internal AppDb Db { get; set; }

        public Address()
        {
        }

        internal Address(AppDb db)
        {
            Db = db;
        }
    }
}