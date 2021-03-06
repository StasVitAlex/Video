namespace Video.BL.Automapper
{
    using System;
    using AutoMapper;
    using Newtonsoft.Json;
    using Models.Dto.Comments;
    using Models.Dto.Folders;
    using Models.Dto.User;
    using Models.ViewModels.Comments;
    using Models.ViewModels.Folders;
    using Models.ViewModels.User;
    using Video.Models.Dto.Video;
    using Video.Models.ViewModels.Video;
    using Video.Utils.Extensions;
    using Video.Models.Dto.Link;
    using Video.Models.ViewModels.Link;

    public class Automapper
    {
        public static IMapper RegisterMapper()
        {
            var jsonSettings = new JsonSerializerSettings {Error = (se, ev) => { ev.ErrorContext.Handled = true; }};
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserDto, UserVm>();
                cfg.CreateMap<UpdateUserDto, UserVm>();
                cfg.CreateMap<SignUpVm, SignUpDto>().ForMember(src => src.ActivationToken, opt => opt.MapFrom(c => Guid.NewGuid()));
                cfg.CreateMap<SignInVm, SignInDto>();
                
                
                cfg.CreateMap<CreateFolderVm, CreateFolderDto>();
                cfg.CreateMap<UpdateFolderVm, UpdateFolderDto>();
                cfg.CreateMap<FolderDto, FolderVm>();
                
                cfg.CreateMap<CommentDto, CommentVm>();
                cfg.CreateMap<CreateCommentVm, CreateCommentDto>();
                cfg.CreateMap<UpdateCommentVm, UpdateCommentDto>();
                cfg.CreateMap<CreateVideoVm, CreateVideoDto>();
                cfg.CreateMap<VideoDto, VideoVm>()
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => new VideoCreatorVm
                    {
                        Id = src.CreatedBy,
                        FirstName = src.UserFirstName,
                        LastName = src.UserLastName,
                        ImageThumbnailUrl = src.UserImageThumbnailUrl
                    }))
                    .ForMember(dest => dest.Extension, opt => opt.MapFrom(src => src.LocationUrl.GetFileExtensionFromUrl()));

                cfg.CreateMap<VideoActivityDto, VideoActivityVm>();
                cfg.CreateMap<CreateVideoLinkVm, CreateVideoLinkDto>();

            });
            config.CompileMappings();
            return config.CreateMapper();
        }
    }
}