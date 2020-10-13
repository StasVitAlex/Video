namespace Video.DAL.Repositories.Implementation
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;
    using Models.Dto.Folders;
    using Models.Enums;

    public class FoldersRepository : BaseRepository, IFoldersRepository
    {
        public FoldersRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }

        public async Task<IEnumerable<FolderDto>> GetUserFolders(int userId, bool isArchived, long parentFolderId)
        {
            var query = $@"select f.id as Id, f.folder_name as Name, f.parent_folder_id as ParentFolderId,
                        (select count(*) from folder_videos fv where fv.folder_id = f.id)
                        from folders f
                        join user_folders_permissions uf on f.id = uf.folder_id
                        where uf.user_id = {userId} and f.is_archived = {isArchived} and f.parent_folder_id = {parentFolderId}";
            return await GetManyAsync<FolderDto>(query);
        }

        public async Task<FolderDto> GetUserRootFolder(int userId)
        {
            return await GetAsync<FolderDto>($@"select f.id as Id, f.folder_name as Name 
                        from folders f
                        join user_folders_permissions uf on f.id = uf.folder_id
                        where uf.user_id = {userId}");
        }


        public async Task<long> CreateFolder(CreateFolderDto model)
        {
            model.ParentFolderId = model.FolderType == FolderType.Public ? (long) FolderType.Public : model.ParentFolderId;
            var folderId = await ExecuteScalarAsync<long>($"insert into folders(tenant_id,folder_name,parent_folder_id) values ({GET_TENANT_QUERY},@Name,@ParentFolderId) returning id", model);
            await ExecuteActionAsync($"insert into user_folders_permissions(tenant_id,user_id,folder_id,permission_id) values ({GET_TENANT_QUERY},{model.UserId},{folderId},{(int) FolderPermissionType.ViewFolders})");
            return folderId;
        }

        public async Task UpdateFolder(int userId, UpdateFolderDto model)
        {
            await ExecuteActionAsync($"update folders set folder_name = @Name where id = @Id ", model);
        }

        public async Task DeleteFolder(long folderId)
        {
            await ExecuteActionAsync($"delete from user_folders_permissions where folder_id = {folderId};delete from folders where id = {folderId}; ");
        }

        public async Task ArchiveFolder(int userId, long folderId)
        {
            await ExecuteActionAsync($"update folders set is_archived = true where id = {folderId}; update user_folders_permissions set is_deleted = true where user_id = {userId} and folder_id = {folderId}");
        }

        public async Task<bool> UserHasAccessToFolder(int userId, long folderId)
        {
            var hasAccess = await GetAsync<int>($"select count(*) from user_folders_permissions where folder_id = {folderId} and  user_id = {userId}");
            return hasAccess > 0;
        }
    }
}