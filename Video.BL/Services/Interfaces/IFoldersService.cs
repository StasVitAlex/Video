namespace Video.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.ViewModels.Folders;

    public interface IFoldersService
    {
        Task<List<FolderVm>> GetUserFolders(int userId, int? parentFolderId);
        Task<int> CreateFolder(int userId, CreateFolderVm model);
        Task UpdateFolder(int userId, UpdateFolderVm model);
        Task DeleteFolder(int userId, int folderId);
    }
}