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

        public BaseRepository(IOptions<DatabaseConfiguration> dataConfiguration)
        {
            _connectionString = dataConfiguration.Value.ConnectionString;
        }

        public async Task<T> GetAsync<T>(string sql)
        {
            T result;
            await using var connection = new NpgsqlConnection(_connectionString);
            try
            {
                result = await connection.QueryFirstOrDefaultAsync<T>(sql);
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
                result = await connection.ExecuteScalarAsync<T>(sql, model);
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
                result = await connection.QueryAsync<T>(sql);
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


        protected async Task ExecuteActionAsync(string sql)
        {
            await using var connection = new NpgsqlConnection(_connectionString);
            try
            {
                await connection.ExecuteAsync(sql);
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