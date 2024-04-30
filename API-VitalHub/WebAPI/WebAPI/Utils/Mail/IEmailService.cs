namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //Método assíncrono para envio de e-mail
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
