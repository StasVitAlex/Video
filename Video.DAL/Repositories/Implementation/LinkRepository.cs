namespace Video.DAL.Repositories.Implementation
{
    using System;
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
            var link = await ExecuteScalarAsync<(long id, string linkUrl)>(
                $@"insert into links(tenant_id, publisher_user_id, created_by, link_url, link_code, video_id, folder_id, link_password, expiry_date, link_type_id) 
                    values({GET_TENANT_QUERY},{userId},{userId},@LinkUrl,@LinkCode,@VideoId,@FolderId,{(int) LinkType.Video}) returning id, link_url", model);
            await SetCommentsPermissions(link.id, userId, model.CommentsAccessType);
            return link.linkUrl;
        }

        private async Task SetCommentsPermissions(long linkId, long userId, VideoAccessType accessType)
        {
            switch (accessType)
            {
                case VideoAccessType.Everyone:
                    await ExecuteActionAsync(
                        $@"insert into user_link_permissions(link_id,created_by, permission_id)
                            values(${linkId}${userId},${VideoPermissionType.Comment})");
                    break;
                case VideoAccessType.SignedInUsers:
                    await ExecuteActionAsync($@"insert into user_link_permissions(link_id,tenant_id,created_by, permission_id)
                            values(${linkId},${GET_TENANT_QUERY},${userId},${VideoPermissionType.Comment})");
                    break;
                case VideoAccessType.None:
                default:
                    break;
            }
        }

        public async Task<LinkPermissionDto> GetVideoLinkPermission(long linkId, VideoPermissionType permissionType)
        {
            return await GetAsync<LinkPermissionDto>($@"select lp.id as Id, lp.tenant_id as TenantId, lp.user_id as UserId
                from user_link_permissions lp
                join permissions p on lp.permission_id = p.id
                join links l on lp.links_id = l.id
                where l.id = {linkId} and p.permission_type_id={(int)PermissionType.Video} and p.id={(int)permissionType}");
        }

        public async Task<string> GetLink(long userId, long videoId, string linkPassword, DateTime expiryDate)
        {
            return await GetAsync<string>(
                $@"select l.link_url from links 
                    where l.publisher_user_id = @userId and l.video_id = @videoId and
                    l.link_password = @linkPassword and l.expiry_date = @expiryDate",
                new {userId, videoId, linkPassword, expiryDate});
        }
    }
}
