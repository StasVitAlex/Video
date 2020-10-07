namespace Video.BL.Automapper
{
    using AutoMapper;
    using Newtonsoft.Json;

    public class Automapper
    {
        public static IMapper RegisterMapper()
        {
            var jsonSettings = new JsonSerializerSettings {Error = (se, ev) => { ev.ErrorContext.Handled = true; }};
            var config = new MapperConfiguration(cfg => { });
            config.CompileMappings();
            return config.CreateMapper();
        }
    }
}