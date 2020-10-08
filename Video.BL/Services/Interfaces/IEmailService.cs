namespace Video.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Net.Mail;
    using System.Threading.Tasks;

    public interface IEmailService
    {
        Task SendEmail(string email, string subject, string body, List<string> copy = null, Attachment attachment = null);
    }
}