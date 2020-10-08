namespace Video.DAL.Repositories.Implementation
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;
    using Models.Dto.Folders;

    public class FoldersRepository : BaseRepository, IFoldersRepository
    {
        public FoldersRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }

        public async Task<IEnumerable<FolderDto>> GetUserFolders(int userId, int? parentFolderId = null)
        {
            return new List<FolderDto>();
        }

        public async Task<int> CreateFolder(int userId, CreateFolderDto model)
        {
            return 1;
        }

        public async Task UpdateFolder(int userId, UpdateFolderDto model)
        {
        }

        public async Task DeleteFolder(int userId, int folderId)
        {
        }

        public async Task<bool> UserHasAccessToFolder(int userId, int folderId)
        {
            return true;
        }
    }
}