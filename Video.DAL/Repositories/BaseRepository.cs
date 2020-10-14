namespace Video.DAL.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Dapper;
    using Microsoft.Extensions.Options;
    using Models.Configuration;
    using Npgsql;

    public class BaseRepository
    {
        private readonly string _connectionString;

        private const string SET_USER_SESSION = "SET my.username = 'VideoApp';";

        //todo:Remove later
        protected const string GET_TENANT_QUERY = "(select id from tenants where is_active = true limit 1)";

        public BaseRepository(IOptions<DatabaseConfiguration> dataConfiguration)
        {
            _connectionString = dataConfiguration.Value.ConnectionString;
        }

        public async Task<T> GetAsync<T>(string sql, object model = null)
        {
            T result;
            await using var connection = new NpgsqlConnection(_connectionString);
            try
            {
                result = await connection.QueryFirstOrDefaultAsync<T>(SET_USER_SESSION + sql, model);
            }
            catch (Exception sqlException)
            {
                throw sqlException;
            }
            finally
            {
                await connection.CloseAsync();
            }

            return result;
        }

        public async Task<T> ExecuteScalarAsync<T>(string sql, object model)
        {
            T result;
            await using var connection = new NpgsqlConnection(_connectionString);
            try
            {
                result = await connection.ExecuteScalarAsync<T>(SET_USER_SESSION + sql, model);
            }
            catch (Exception sqlException)
            {
                throw sqlException;
            }
            finally
            {
                await connection.CloseAsync();
            }

            return result;
        }

        protected async Task<IEnumerable<T>> GetManyAsync<T>(string sql)
        {
            IEnumerable<T> result;
            await using var connection = new NpgsqlConnection(_connectionString);
            try
            {
                result = await connection.QueryAsync<T>(SET_USER_SESSION + sql);
            }
            catch (Exception sqlException)
            {
                throw sqlException;
            }
            finally
            {
                await connection.CloseAsync();
            }

            return result;
        }


        protected async Task ExecuteActionAsync(string sql, object model = null)
        {
            await using var connection = new NpgsqlConnection(_connectionString);
            try
            {
                await connection.ExecuteAsync(SET_USER_SESSION + sql, model);
            }
            catch (Exception sqlException)
            {
                throw sqlException;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }
    }
}