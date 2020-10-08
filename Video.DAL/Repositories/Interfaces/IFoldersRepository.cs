namespace Video.DAL.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.Dto.Folders;

    public interface IFoldersRepository
    {
        Task<IEnumerable<FolderDto>> GetUserFolders(int userId, int? parentFolderId = null);
        Task<int> CreateFolder(int userId, CreateFolderDto model);
        Task UpdateFolder(int userId, UpdateFolderDto model);
        Task DeleteFolder(int userId, int folderId);
        Task<bool> UserHasAccessToFolder(int userId, int folderId);
    }
}