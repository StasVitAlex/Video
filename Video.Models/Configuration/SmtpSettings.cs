namespace Video.Models.Configuration
{
    public class SmtpSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public bool EnableSsl { get; set; }
        public string NetworkLogin { get; set; }
        public string NetworkPassword { get; set; }
    }
}