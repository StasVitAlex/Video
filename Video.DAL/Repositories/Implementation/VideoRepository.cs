namespace Video.DAL.Repositories.Implementation
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;
    using Models.Dto.Video;
    using Models.Enums;

    public class VideoRepository : BaseRepository, IVideoRepository
    {
        public VideoRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }

        public async Task<IEnumerable<VideoDto>> GetVideosFromFolder(int userId, long folderId, bool isArchived)
        {
            return await GetManyAsync<VideoDto>($@"select distinct v.id as Id,v.title as Title, v.description as Description,
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl, v.created_by as CreatedBy,
                v.length_in_seconds as Duration, v.created_by as CreatedDate, fv.folder_id as FolderId, l.link_code as LinkCode, l.link_url as LinkUrl,
                (select  count(*) from user_actions uva where uva.video_id = v.id) as ViewsCount 
                from videos v
                join folder_videos fv on v.id = fv.video_id
                join links l on v.id = l.video_id 
                join user_folders_permissions uf on fv.folder_id = uf.folder_id and uf.user_id = {userId}
                where fv.folder_id = {folderId} and v.is_deleted = {isArchived}");
        }

        public async Task<VideoDto> GetVideoById(long videoId)
        {
            return await GetAsync<VideoDto>($@"select v.id as Id,v.title as Title, v.description as Description,
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl, v.created_by as CreatedBy,
                v.length_in_seconds as Duration, v.created_by as CreatedDate, fv.folder_id as FolderId, l.link_code as LinkCode, l.link_url as LinkUrl,
                (select  count(*) from user_actions uva where uva.video_id = v.id) as ViewsCount 
                from videos v
                join folder_videos fv on v.id = fv.video_id
                join links l on v.id = l.video_id 
                where v.id = {videoId}");
        }

        public async Task<VideoDto> GetVideoByLink(string link)
        {
            return await GetAsync<VideoDto>($@"select v.id as Id,v.title as Title, v.description as Description,
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl, v.created_by as CreatedBy,
                v.created_by as CreatedDate, fv.folder_id as FolderId,
                v.length_in_seconds as Duration, l.link_code as LinkCode, l.link_url as LinkUrl, l.link_password as LinkPassword, l.id as LinkId,
                u.id as CreatedBy, u.first_name as UserFirstName, u.last_name as UserLastName, u.image_thumbnail_url as UserImageThumbnailUrl, 
                (select count(*) from user_actions uva where uva.video_id = v.id and uva.action_type_id = {(int) VideoActionType.View}) as ViewsCount,
                (select count(*) from (select distinct user_id from user_actions uva where uva.video_id = v.id and uva.action_type_id = {(int) VideoActionType.View}) as user_view_actions) as UniqueViews
                from videos v
                join users u on u.id = v.created_by
                join folder_videos fv on v.id = fv.video_id 
                join links l on v.id = l.video_id 
                where l.link_code = '{link}'");
        }

        public async Task<LinkPermissionDto> GetVideoLinkPermission(long linkId, VideoPermissionType permissionType)
        {
            return await GetAsync<LinkPermissionDto>($@"select lp.id as Id, lp.tenant_id as TenantId, lp.user_id as UserId
                from user_link_permissions lp
                join permissions p on lp.permission_id = p.id
                join links l on lp.links_id = l.id
                where l.id = {linkId} and p.permission_type_id={(int) PermissionType.Video} and p.id={(int) permissionType}");
        }

        public async Task<long> CreateVideo(long userId, CreateVideoDto model)
        {
            var videoId = await ExecuteScalarAsync<long>(
                $"insert into videos(created_by,tenant_id, title) values ({userId},{GET_TENANT_QUERY}, @FileName) returning id", model);
            await ExecuteActionAsync(
                $@"insert into folder_videos(tenant_id,folder_id,video_id) values({GET_TENANT_QUERY}, @FolderId,{videoId});
                    insert into links(tenant_id, publisher_user_id, link_url, link_code, video_id, folder_id, link_type_id) 
                    values({GET_TENANT_QUERY},{userId},@LinkUrl,@LinkCode,{videoId},{model.FolderId},{(int) LinkType.Video})", model);
            return videoId;
        }

        public async Task UpdateVideoInfo(UpdateVideoInfoDto model)
        {
            await ExecuteActionAsync($"update videos set location_url = @LocationUrl, thumbnail_url = @ThumbnailUrl,length_in_seconds = @Duration where id = @Id", model);
        }

        public async Task LogVideoAction(int? userId, long videoId, VideoActionType actionType)
        {
            await ExecuteActionAsync($"insert into user_actions(tenant_id,video_id,user_id,action_type_id) values({GET_TENANT_QUERY},{videoId},{userId},{(int) actionType})");
        }

        public async Task<bool> IsUserHasAccessToVideo(int userId, long videoId)
        {
            return true;
        }


        public async Task ArchiveVideo(long videoId)
        {
            await ExecuteActionAsync($"update videos set is_deleted = true where id = {videoId}");
        }

        public async Task<bool> IsUserVideoOwner(long videoId, int userId)
        {
            var  recordsCount =  await GetAsync<int>($"select count(*) from videos v join links l on v.id = l.video_id where v.id = {videoId} and l.publisher_user_id = {userId}");
            return recordsCount > 0;
        }
    }
}