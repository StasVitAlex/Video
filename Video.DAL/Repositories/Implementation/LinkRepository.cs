namespace Video.DAL.Repositories.Implementation
{
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using Interfaces;
    using Models.Configuration;
    using Models.Dto.Link;
    using Video.Models.Dto.Video;
    using Models.Enums;

    public class LinkRepository: BaseRepository, IILinkRepository
    {
        public LinkRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }

        public async Task<string> CreateVideoLink(long userId, CreateVideoLinkDto model)
        {
            return await ExecuteScalarAsync<string>(
                $@"insert into links(tenant_id, publisher_user_id, created_by, link_url, link_code, video_id, folder_id, link_type_id) 
                    values({GET_TENANT_QUERY},{userId},{userId},@LinkUrl,@LinkCode,@VideoId,@FolderId,{(int) model.LinkType})", model);
        }

        public async Task<LinkPermissionDto> GetVideoLinkPermission(long linkId, VideoPermissionType permissionType)
        {
            return await GetAsync<LinkPermissionDto>($@"select lp.id as Id, lp.tenant_id as TenantId, lp.user_id as UserId
                from user_link_permissions lp
                join permissions p on lp.permission_id = p.id
                join links l on lp.links_id = l.id
                where l.id = {linkId} and p.permission_type_id={(int)PermissionType.Video} and p.id={(int)permissionType}");
        }
    }
}
