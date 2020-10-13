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

        public async Task<IEnumerable<VideoDto>> GetVideosFromFolder(int userId, long folderId)
        {
            return await GetManyAsync<VideoDto>($@"select distinct v.id as Id,v.title as Title, v.description as Description,
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl
                v.length_in_seconds as LengthInSeconds, v.is_pwd_protected as IsPasswordProtected, v.created_by as CreatedBy,
                v.created_by as CreatedDate, fv.folder_id as FolderId,
                (select  count(*) from user_actions uva where uva.video_id = v.id) as ViewsCount 
                from videos v
                join folder_videos fv on v.id = fv.video_id
                join user_folders_permissions uf on fv.folder_id = uf.folder_id and uf.user_id = {userId}
                where fv.folder_id = {folderId}");
        }

        public async Task<VideoDto> GetVideoById(long videoId)
        {
            return await GetAsync<VideoDto>($@"select v.id as Id,v.title as Title, v.description as Description,
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl
                v.length_in_seconds as LengthInSeconds, v.is_pwd_protected as IsPasswordProtected, v.created_by as CreatedBy,
                v.created_by as CreatedDate, fv.folder_id as FolderId,
                (select  count(*) from user_actions uva where uva.video_id = v.id) as ViewsCount 
                from videos v
                join folder_videos fv on v.id = fv.video_id
                where v.id = {videoId}");
        }

        public async Task<VideoDto> GetVideoByLink(string link)
        {
            return await GetAsync<VideoDto>($@"select v.id as Id,v.title as Title, v.description as Description,
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl, v.created_by as CreatedBy,
                v.created_by as CreatedDate, fv.folder_id as FolderId,
                (select count(*) from user_actions uva where uva.video_id = v.id and uva.action_type_id = {(int) VideoActionType.View}) as ViewsCount,
                (select count(distinct user_id) from user_actions uva where uva.video_id = v.id and uva.action_type_id = {(int) VideoActionType.View}) as UniqueViews
                from videos v 
                join folder_videos fv on v.id = fv.video_id 
                join links l on v.id = l.video_id 
                where l.link_code = '{link}'");
        }

        public async Task<long> CreateVideo(long userId, CreateVideoDto model)
        {
            var videoId = await ExecuteScalarAsync<long>(
                $"insert into videos(tenant_id, title) values ({GET_TENANT_QUERY}, @FileName) returning id", model);
            await ExecuteActionAsync(
                $@"insert into folder_videos(tenant_id,folder_id,video_id) values({GET_TENANT_QUERY}, @FolderId,{videoId});
                    insert into links(tenant_id, publisher_user_id, link_url, link_code, video_id, link_type_id) 
                    values({GET_TENANT_QUERY},{userId},@LinkUrl,@LinkCode,{videoId},{(int) LinkType.Video})", model);
            return videoId;
        }

        public async Task UpdateVideoUrls(UpdateVideoUrlsDto model)
        {
            await ExecuteScalarAsync<long>(
                $"update videos set location_url = @LocationUrl, thumbnail_url = @ThumbnailUrl where id = @Id", model);
        }

        public async Task LogVideoAction(int? userId, long videoId, VideoActionType actionType)
        {
            await ExecuteActionAsync($"insert into user_actions(tenant_id,video_id,user_id,action_type_id) values({GET_TENANT_QUERY},{videoId},{userId},{(int) actionType})");
        }

        public async Task<bool> IsUserHasAccessToVideo(int userId, long videoId)
        {
            //return await ExecuteScalarAsync<bool>($@"exists(
            //    (select 1 from links l where l.link_code={linkCode} and l.publisher_user_id={userId}) or 
            //    ())")
            return true;
        }
    }
}