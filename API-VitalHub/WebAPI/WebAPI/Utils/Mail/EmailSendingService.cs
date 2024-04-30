using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Utils.Mail
{
    public class EmailSendingService
    {
        private readonly IEmailService emailService;
        public EmailSendingService(IEmailService service)
        {
            emailService = service;
        }

        /// <summary>
        /// Método para envio de email de boas vindas ao cadastrar um novo usuário
        /// </summary>
        /// <param name="email">Email para qual será enviado</param>
        /// <param name="userName">Nome do usuário</param>
        /// <returns></returns>
        [HttpPost]
        public async Task SendWelcomeEmail(string email, string userName)
        {
            try
            {
                //monta a requisição passando os dados do email
                MailRequest request = new MailRequest
                {
                    ToEmail = email,
                    Subject = "Bem vindo ao VitalHub",
                    Body = GetHtmlContentWelcome(userName)
                };

                //chama o método para enviar a requisição e consequentemente o email
                await emailService.SendEmailAsync(request);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Método para enviar um email de recuperação de senha
        /// </summary>
        /// <param name="email"></param>
        /// <param name="codigo"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task SendRecovery(string email, int codigo)
        {
            try
            {
                //monta a requisição passando os dados do email
                MailRequest request = new MailRequest
                {
                    ToEmail = email,
                    Subject = "Recuperar a sua senha VitalHub",
                    Body = GetHtmlContentRecovery(codigo)
                };

                //chama o método para enviar a requisição e consequentemente o email
                await emailService.SendEmailAsync(request);
            }
            catch (Exception)
            {
                throw;
            }
        }


        //Método para email de boas vindas
        private string GetHtmlContentWelcome(string userName)
        {
            //caminho imagem original
            string imagemVitalHub = "https://blobvitalhub.blob.core.windows.net/containervitalhub/logotipo.png";

            //caminho imagem poggers
            string imagemPoggers = "https://cdn.akamai.steamstatic.com/steam/apps/1039200/capsule_616x353.jpg?t=1710550215";

            // Constrói o conteúdo HTML do e-mail, incluindo o nome do usuário
            string Conteudo = @"
<div style=""width:100%; background-color:rgba(96, 191, 197, 1); padding: 20px;"">
    <div style=""max-width: 600px; margin: 0 auto; background-color:#FFFFFF; border-radius: 10px; padding: 20px;"">
        <img src=""https://blobvitalhub.blob.core.windows.net/containervitalhub/logotipo.png"" alt="" Logotipo da Aplicação"" style="" display: block; margin: 0 auto; max-width: 200px;"" />
        <h1 style=""color: #333333; text-align: center;"">Bem-vindo ao VitalHub!</h1>
        <p style=""color: #666666; text-align: center;"">Olá <strong>" + userName + @"</strong>,</p>
        <p style=""color: #666666;text-align: center"">Estamos muito felizes por você ter se inscrito na plataforma VitalHub.</p>
        <p style=""color: #666666;text-align: center"">Explore todas as funcionalidades que oferecemos e encontre os melhores médicos.</p>
        <p style=""color: #666666;text-align: center"">Se tiver alguma dúvida ou precisar de assistência, nossa equipe de suporte está sempre pronta para ajudar.</p>
        <p style=""color: #666666;text-align: center"">Aproveite sua experiência conosco!</p>
        <p style=""color: #666666;text-align: center"">Atenciosamente,<br>Equipe VitalHub</p>
    </div>
</div>";

            // Retorna o conteúdo HTML do e-mail
            return Conteudo;
        }


        //Método para email de recuperação de senha
        private string GetHtmlContentRecovery(int codigo)
        {
            string Response = @"
<div style=""width:100%; background-color:rgba(96, 191, 197, 1); padding: 20px;"">
    <div style=""max-width: 600px; margin: 0 auto; background-color:#FFFFFF; border-radius: 10px; padding: 20px;"">
        <img src=""https://blobvitalhub.blob.core.windows.net/containervitalhub/logotipo.png"" alt="" Logotipo da Aplicação"" style="" display: block; margin: 0 auto; max-width: 200px;"" />
        <h1 style=""color: #333333;text-align: center;"">Recuperação de senha</h1>
        <p style=""color: #666666;font-size: 24px; text-align: center;"">Código de confirmação <strong>" + codigo + @"</strong></p>
    </div>
</div>";

            return Response;
        }
    }
}




