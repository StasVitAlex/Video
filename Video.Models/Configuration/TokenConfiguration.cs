namespace Video.Models.Configuration
{
    public class TokenConfiguration
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int LifeTime { get; set; }
    }
}