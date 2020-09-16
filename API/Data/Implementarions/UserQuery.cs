using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySqlConnector;


using TrabalhoRest.Models;
using TrabalhoRest.Data.AppDB;

namespace TrabalhoRest.Data
{
    public class UserQuery
    {
        public AppDb Db { get; }

        public UserQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<User>> FindAllAsync()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `cpf`, `name` FROM `user`";
            
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result : null;
        }


        public async Task<User> FindOneAsync(int id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `cpf`, `name` FROM `user` WHERE `id` = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.String,
                Value = id,
            });
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());

            if(result.Count > 0){

                using var cmdAddress = Db.Connection.CreateCommand();
                cmdAddress.CommandText = @"SELECT `id`, `street`, `number`, `userId` FROM `address` WHERE `userId` = @userId";
                cmdAddress.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@userId",
                    DbType = DbType.Int32,
                    Value = result[0].Id,
                });

                var query = new AddressQuery(Db);
                var address = await query.FindOneAsync(result[0].Id);
                result[0].Address = address;

                return result[0];
            }

            return null;
        }

        public async Task<User> FindOneByCpfAsync(string cpf)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `cpf`, `name` FROM `user` WHERE `cpf` = @cpf";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@cpf",
                DbType = DbType.String,
                Value = cpf,
            });
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());

            if(result.Count > 0){

                using var cmdAddress = Db.Connection.CreateCommand();
                cmdAddress.CommandText = @"SELECT `id`, `street`, `number`, `userId` FROM `address` WHERE `userId` = @userId";
                cmdAddress.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@userId",
                    DbType = DbType.Int32,
                    Value = result[0].Id,
                });
                var query = new AddressQuery(Db);
                var address = await query.FindOneAsync(result[0].Id);
                result[0].Address = address;

                return result[0];
            }

            return null;
        }

        public async Task<List<User>> LatestPostsAsync()
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `name`, `cpf` FROM `user` ORDER BY `id` DESC LIMIT 10;";
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task DeleteAllAsync()
        {
            using var txn = await Db.Connection.BeginTransactionAsync();
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"DELETE FROM `user`";
            await cmd.ExecuteNonQueryAsync();
            await txn.CommitAsync();
        }

        private async Task<List<User>> ReadAllAsync(DbDataReader reader)
        {
            var users = new List<User>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var user = new User(Db)
                    {
                        Id = reader.GetInt32(0),
                        CPF = reader.GetString(1),
                        Name = reader.GetString(2),
                    };
                    users.Add(user);
                }
            }
            return users;
        }
    }
}