using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySqlConnector;


using TrabalhoRest.Models;
using TrabalhoRest.Data.AppDB;

namespace TrabalhoRest.Data
{
    public class AddressQuery
    {
        public AppDb Db { get; }

        public AddressQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Address>> FindAllAsync()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `street`, `number`, `userId` FROM `address`";
            
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result : null;
        }


        public async Task<Address> FindOneAsync(int userId)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `street`, `number`, `userId` FROM `address` WHERE `userId` = @userId";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@userId",
                DbType = DbType.String,
                Value = userId,
            });
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            
            return result.Count > 0 ? result[0] : null;
        }

        public async Task DeleteAllAsync()
        {
            using var txn = await Db.Connection.BeginTransactionAsync();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"DELETE FROM `address`";
            await cmd.ExecuteNonQueryAsync();
            await txn.CommitAsync();
        }

        private async Task<List<Address>> ReadAllAsync(DbDataReader reader)
        {
            var addresses = new List<Address>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var address = new Address(Db)
                    {
                        Id = reader.GetInt32(0),
                        Street = reader.GetString(1),
                        Number = reader.GetString(2),
                    };
                    addresses.Add(address);
                }
            }
            return addresses;
        }
    }
}