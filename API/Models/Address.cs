using System.Data;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MySqlConnector;
using TrabalhoRest.Data.AppDB;

namespace TrabalhoRest.Models
{
    public class Address{

        public int Id { get; set; }

        //[Required(ErrorMessage = "O campo logradouro é obrigatório.")]
        public string Street { get; set; }

        //[Required(ErrorMessage = "O campo número é obrigatório.")]
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