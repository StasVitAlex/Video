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
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl,
                v.length_in_seconds as LengthInSeconds, v.is_pwd_protected as IsPasswordProtected, v.created_by as CreatedDate,
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
                v.location_url as LocationUrl, v.thumbnail_url as ThumbnailUrl,
                v.length_in_seconds as LengthInSeconds, v.is_pwd_protected as IsPasswordProtected, v.created_by as CreatedDate,
                v.created_by as CreatedDate, fv.folder_id as FolderId,
                (select  count(*) from user_actions uva where uva.video_id = v.id) as ViewsCount 
                from videos v
                join folder_videos fv on v.id = fv.video_id
                where v.id = {videoId}");
        }

        public async Task<VideoDto> GetVideoByLink(string link)
        {
            return new VideoDto();
        }

        public async Task<long> CreateVideo(CreateVideoDto model)
        {
            return 0;
        }

        public async Task LogVideoAction(int? userId, long videoId, VideoActionType actionType)
        {
            await ExecuteActionAsync($"insert into user_actions(tenant_id,video_id,user_id,action_type_id) values({GET_TENANT_QUERY},{videoId},{userId},{(int) actionType})");
        }

        public async Task<bool> IsUserHasAccessToVideo(int userId, long videoId)
        {
            return true;
        }
    }
}