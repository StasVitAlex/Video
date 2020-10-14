namespace Video.DAL.Repositories.Interfaces
{
    using System;
    using System.Threading.Tasks;
    using Video.Models.Dto.Video;
    using Models.Enums;
    using Models.Dto.Link;

    public interface IILinkRepository
    {
        Task<string> CreateVideoLink(long userId, CreateVideoLinkDto model);
        Task<LinkPermissionDto> GetVideoLinkPermission(long linkId, VideoPermissionType permissionType);
        Task<string> GetLink(long userId, long videoId, string linkPassword, DateTime expiryDate);
    }
}
