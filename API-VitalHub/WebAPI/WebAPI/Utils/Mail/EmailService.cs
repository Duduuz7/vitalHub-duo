
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //Variável que armazena as configs de EmailSettings
        private readonly EmailSettings emailSettings;

        //Construtor que recebe a dependence injection de EmailSettings
        public EmailService(IOptions<EmailSettings> options)
        {
            emailSettings = options.Value;
        }


        //Método para envio de e-mail
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //Objeto que representa o e-mail
                var email = new MimeMessage();

                //define o remetente do e-mail
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //Define o destinatário do e-mail
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //Define o assunto do e-mail
                email.Subject = mailRequest.Subject;

                //Cria o corpo do e-mail
                var builder = new BodyBuilder();

                //Define o corpo do e-mail como html
                builder.HtmlBody = mailRequest.Body;

                //Define o corpo do e-mail no objeto MimeMessage
                email.Body = builder.ToMessageBody();

                using (var smtp = new SmtpClient())
                {
                    //Conecta-se ao servidor SMTP usando os dados do emailSettings
                    smtp.Connect(emailSettings.Host,emailSettings.Port,SecureSocketOptions.StartTls);

                    //Autentica-se no servidor SMTP usando os dados de emailSettings
                    smtp.Authenticate(emailSettings.Email,emailSettings.Password);

                    //Envia o e-mail
                    await smtp.SendAsync(email);
                }

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
