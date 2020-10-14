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
                v.length_in_seconds as Duration, v.created_date as CreatedDate, fv.folder_id as FolderId,
                (select  count(*) from user_actions uva where uva.video_id = v.id) as ViewsCount 
                from videos v
                join folder_videos fv on v.id = fv.video_id
                join user_folders_permissions uf on fv.folder_id = uf.folder_id and uf.user_id = {userId}
                where fv.folder_id = {folderId} and v.is_deleted = {isArchived}");
        }

        public async Task<VideoDto> GetVideoById(long videoId, long userId)
        {
            return await GetAsync<VideoDto>($@"select v.id as Id,v.title as Title, v.description as Description,
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl, v.created_by as CreatedBy,
                v.length_in_seconds as Duration, v.created_date as CreatedDate, fv.folder_id as FolderId,
                 u.id as CreatedBy, u.first_name as UserFirstName, u.last_name as UserLastName, u.image_thumbnail_url as UserImageThumbnailUrl, 
                (select count(*) from user_actions uva where uva.video_id = v.id and uva.action_type_id = {(int)UserActionType.View}) as ViewsCount,
                (select count(*) from (select distinct user_id from user_actions uva where uva.video_id = v.id and uva.action_type_id = {(int)UserActionType.View}) as user_view_actions) as UniqueViews
                from videos v
                join folder_videos fv on v.id = fv.video_id
                left join users u on u.id = v.created_by
                where v.id = {videoId} and v.created_by = {userId}");
        }

        public async Task<VideoDto> GetVideoByLink(string link)
        {
            return await GetAsync<VideoDto>($@"select v.id as Id,v.title as Title, v.description as Description,
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl, v.created_by as CreatedBy,
                v.created_date as CreatedDate, fv.folder_id as FolderId,
                v.length_in_seconds as Duration, l.link_code as LinkCode, l.link_url as LinkUrl, l.link_password as LinkPassword, l.id as LinkId,
                u.id as CreatedBy, u.first_name as UserFirstName, u.last_name as UserLastName, u.image_thumbnail_url as UserImageThumbnailUrl, 
                (select count(*) from user_actions uva where uva.video_id = v.id and uva.action_type_id = {(int) UserActionType.View}) as ViewsCount,
                (select count(*) from (select distinct user_id from user_actions uva where uva.video_id = v.id and uva.action_type_id = {(int) UserActionType.View}) as user_view_actions) as UniqueViews
                from videos v
                join folder_videos fv on v.id = fv.video_id 
                join links l on v.id = l.video_id 
                left join users u on u.id = l.publisher_user_id
                where l.link_code = '{link}'");
        }

        public async Task<long> CreateVideo(long userId, CreateVideoDto model)
        {
            var videoId = await ExecuteScalarAsync<long>(
                $"insert into videos(created_by,tenant_id, title) values ({userId},{GET_TENANT_QUERY}, @FileName) returning id", model);
            await ExecuteActionAsync(
                $@"insert into folder_videos(tenant_id,folder_id,video_id) values({GET_TENANT_QUERY}, @FolderId,{videoId})", model);
            return videoId;
        }

        public async Task UpdateVideoInfo(UpdateVideoInfoDto model)
        {
            await ExecuteActionAsync($"update videos set location_url = @LocationUrl, thumbnail_url = @ThumbnailUrl,length_in_seconds = @Duration where id = @Id", model);
        }

        public async Task LogVideoAction(int? userId, long videoId, UserActionType actionType)
        {
            await ExecuteActionAsync($"insert into user_actions(tenant_id,video_id,user_id,action_type_id) values({GET_TENANT_QUERY},{videoId},{userId},{(int) actionType})");
        }

        public async Task<bool> IsUserHasAccessToVideo(int userId, long videoId)
        {
            return true;
        }

        public async Task<bool> IsUserVideoOwner(int userId, int videoId)
        {
            return await ExecuteScalarAsync<bool>(
                $@"select count(1) from videos where id=@videoId and created_by=@userId", 
                new { userId, videoId });
        }

        public async Task ArchiveVideo(long videoId)
        {
            await ExecuteActionAsync($"update videos set is_deleted = true where id = {videoId}");
        }

        public async Task<bool> IsUserVideoOwner(long userId, long videoId)
        {
            return await ExecuteScalarAsync<bool>(
                $"select count(1) from videos v join links l on v.id = l.video_id where v.id = @videoId and l.created_by = @userId",
                new { videoId, userId });
        }

        public async Task<IEnumerable<VideoActivityDto>> GetVideoActivity(long videoId)
        {
            return await GetManyAsync<VideoActivityDto>($@"select * from (
                select ua.id, u.id as UserId, u.first_name as FirstName, u.last_name as LastName, u.image_thumbnail_url as ImageThumbnailUrl,
                       ua.video_id as VideoId, ua.action_type_id as UserActionType, ua.created_date as ActionDate
                from user_actions ua
                left JOIN users u on u.id = ua.user_id
                where video_id = {videoId}
                union
                select vc.id, u.id as UserId, u.first_name as FirstName, u.last_name as LastName, u.image_thumbnail_url as ImageThumbnailUrl,
                       vc.video_id as VideoId, 4 as UserActionType, vc.created_date as ActionDate
                from video_comments vc
                left JOIN users u on u.id = vc.created_by
                where video_id = {videoId}) as actions");
        }

        public async Task<bool> Exists(long videoId)
        {
            return await ExecuteScalarAsync<bool>($"select count(1) from videos where id=@videoId", new { videoId });
        }
    }
}