namespace Video.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.ViewModels.Folders;

    public interface IFoldersService
    {
        Task<List<FolderVm>> GetUserFolders(int userId, bool isArchived, long parentFolderId);
        Task<long> CreateFolder(int userId, CreateFolderVm model);
        Task UpdateFolder(int userId, UpdateFolderVm model);
        Task ArchiveFolder(int userId, long folderId);
        
        Task DeleteFolder(long folderId);
        Task<FolderVm> GetUserRootFolder(int userId);
    }
}