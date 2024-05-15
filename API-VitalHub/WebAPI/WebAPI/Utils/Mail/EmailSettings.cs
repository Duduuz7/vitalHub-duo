namespace WebAPI.Utils.Mail
{
    public class EmailSettings
    {
        //Email do Remetente
        public string? Email { get; set; }
        
        //Senha do Remetente
        public string? Password { get; set; }

        //Host do servidor SMTP(Simple Mail Transfer Protocol)
        public string? Host { get; set; }

        //Nome exibido do Remetente
        public string? DisplayName { get; set; }

        //Porta do servidor SMTP
        public int Port { get; set; }
    }
}
