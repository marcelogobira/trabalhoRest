using System.Data;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MySqlConnector;
using TrabalhoRest.Data.AppDB;
using TrabalhoRest.Data;

namespace TrabalhoRest.Models
{
    public class User{

        public int Id { get; set; }

        [Required(ErrorMessage = "O campo nome é obrigatório.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo CPF é obrigatório.")]
        public string CPF { get; set; }

        public Address Address { get; set; }

        internal AppDb Db { get; set; }

        public User()
        {
            this.Address = new Address();
        }

        internal User(AppDb db)
        {
            Db = db;
        }

        public async Task InsertAsync()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"INSERT INTO `user` (`Name`, `CPF`) VALUES (@name, @cpf);";
            BindParams(cmd);
            await cmd.ExecuteNonQueryAsync();
            Id = (int) cmd.LastInsertedId;

            using var cmdAddress = Db.Connection.CreateCommand();
            cmdAddress.CommandText = @"INSERT INTO `address` (`Street`, `Number`, `UserId`) VALUES (@street, @number, @userId);";
            BindAddressParams(cmdAddress);
            await cmdAddress.ExecuteNonQueryAsync();
        }

        public async Task UpdateAsync()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"UPDATE `user` SET `Name` = @name, `CPF` = @cpf WHERE `Id` = @id;";
            BindParams(cmd);
            BindId(cmd);
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task DeleteAsync(int id)
        {
            using var cmdAddress = Db.Connection.CreateCommand();
            cmdAddress.CommandText = @"DELETE FROM `address` WHERE `userId` = @id;";
            BindId(cmdAddress);
            await cmdAddress.ExecuteNonQueryAsync();

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"DELETE FROM `user` WHERE `Id` = @id;";
            BindId(cmd);
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task GetAllAsync()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT Id, Name, CPF FROM `user`;";
            BindId(cmd);
            await cmd.ExecuteReaderAsync();
        }

        public async Task GetUserAsync()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT Id, Name, CPF FROM `user` WHERE `Id` = @id;";
            BindId(cmd);
            await cmd.ExecuteReaderAsync();
        }

        private void BindId(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = Id,
            });
        }

        private void BindParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@name",
                DbType = DbType.String,
                Value = Name,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@cpf",
                DbType = DbType.String,
                Value = CPF,
            });
        }

        private void BindAddressParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@street",
                DbType = DbType.String,
                Value = Address.Street,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@number",
                DbType = DbType.String,
                Value = Address.Number,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@userId",
                DbType = DbType.String,
                Value = Id,
            });
        }

        public bool ValidarCPF()
        {
            return this._ValidarCPF(this.CPF);
        }

        private bool _ValidarCPF(string cpf)
        {
            int[] multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string tempCpf;
            string digito;
            int soma;
            int resto;
            cpf = cpf.Trim();
            cpf = cpf.Replace(".", "").Replace("-", "");
            if (cpf.Length != 11)
                return false;
            tempCpf = cpf.Substring(0, 9);
            soma = 0;

            for(int i=0; i<9; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];
            resto = soma % 11;
            if ( resto < 2 )
                resto = 0;
            else
            resto = 11 - resto;
            digito = resto.ToString();
            tempCpf = tempCpf + digito;
            soma = 0;
            for(int i=0; i<10; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto.ToString();
            return cpf.EndsWith(digito);	    
        }
    }
}