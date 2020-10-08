namespace Video.BL.Services.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Mail;
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;

    public class EmailService : IEmailService
    {
        private readonly SmtpSettings _settings;

        public EmailService(IOptions<SmtpSettings> settings)
        {
            _settings = settings.Value;
        }


        public async Task SendEmail(string email, string subject, string body, List<string> copy, Attachment attachment = null)
        {
            var to = new MailAddress(email);

            var from = new MailAddress(this._settings.NetworkLogin);
            var mail = new MailMessage(from, to)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };
            if (attachment != null)
            {
                mail.Attachments.Add(attachment);
            }

            if (copy != null)
            {
                foreach (var cc in copy.Select(emailCopy => new MailAddress(emailCopy)))
                {
                    mail.CC.Add(cc);
                }
            }

            using var client = new SmtpClient
            {
                Host = this._settings.Host,
                Port = this._settings.Port,
                Credentials = new NetworkCredential(this._settings.NetworkLogin, this._settings.NetworkPassword),
                EnableSsl = _settings.EnableSsl
            };
            await client.SendMailAsync(mail);
        }
    }
}