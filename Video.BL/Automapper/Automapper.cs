namespace Video.BL.Automapper
{
    using System;
    using AutoMapper;
    using Models.Dto.User;
    using Models.ViewModels.User;
    using Newtonsoft.Json;

    public class Automapper
    {
        public static IMapper RegisterMapper()
        {
            var jsonSettings = new JsonSerializerSettings {Error = (se, ev) => { ev.ErrorContext.Handled = true; }};
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserDto, UserVm>();
                cfg.CreateMap<SignUpVm, SignUpDto>().ForMember(src => src.ActivationToken, opt => opt.MapFrom(c => Guid.NewGuid()));
                cfg.CreateMap<SignInVm, SignInDto>();
            });
            config.CompileMappings();
            return config.CreateMapper();
        }
    }
}