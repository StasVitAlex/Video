namespace Video.DAL.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.Dto.Folders;

    public interface IFoldersRepository
    {
        Task<IEnumerable<FolderDto>> GetUserFolders(int userId, bool isArchived, long? parentFolderId = null);
        Task<long> CreateFolder(CreateFolderDto model);
        Task UpdateFolder(int userId, UpdateFolderDto model);
        Task DeleteFolder(long folderId);
        Task ArchiveFolder(int userId, long folderId);
        Task<bool> UserHasAccessToFolder(int userId, long folderId);
    }
}