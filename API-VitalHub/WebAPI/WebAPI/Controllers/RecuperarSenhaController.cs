using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Utils.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecuperarSenhaController : ControllerBase
    {

        private readonly VitalContext _context;
        private readonly EmailSendingService _emailSendingService;
        public RecuperarSenhaController(VitalContext context, EmailSendingService emailSendingService)
        {
            _context = context;
            _emailSendingService = emailSendingService;
        }

        [HttpPost]
        public async Task<IActionResult> SendRecoveryCodePassword(string email)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (user == null)
                {
                    return NotFound("Usuário não encontrado !!!");
                }

                //Gerar um código com 4 algarismos
                Random random = new Random();

                int recoveyCode = random.Next(1000, 9999);

                user.CodRecupSenha = recoveyCode;

                await _context.SaveChangesAsync();

                await _emailSendingService.SendRecovery(user.Email!, recoveyCode);

                return Ok("Código enviado com sucesso !!!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Crie um controller para validar o código enviado para o email
        //Se o código for igual, resete o código anterior no banco e devolva um status code 
        //informando se o código é válido

        [HttpPost("ValidateRecoveryCode")]
        public async Task<IActionResult> ValidateRecoveryCode(string email, int code)
        {
            try
            {
                //Acha o usuário pelo email
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound("E-mail inválido!");
                }

                if (user.CodRecupSenha != code)
                {
                    return BadRequest("Código de recuperação é inválido !!!");
                }

                //Após validar, apaga o código anterior
                user.CodRecupSenha = null;

                await _context.SaveChangesAsync();

                return Ok("Código de recureperação confirmado !!!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
