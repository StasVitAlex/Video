namespace Video.DAL.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Dapper;
    using Npgsql;

    public class BaseRepository
    {
        public async Task<T> GetAsync<T>(string sql)
        {
            T result;
            await using var connection = new NpgsqlConnection("");
            try
            {
                await connection.OpenAsync();
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

        protected async Task<IEnumerable<T>> GetManyAsync<T>(string sql)
        {
            IEnumerable<T> result;
            await using var connection = new NpgsqlConnection("");
            try
            {
                await connection.OpenAsync();
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
            await using var connection = new NpgsqlConnection("");
            await connection.OpenAsync();
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