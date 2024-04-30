using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
            try
            {
                //Verifica se existe um arquivo 
                if (arquivo != null)
                {
                    //Gera um nome único + extensao do arquivo, ex abaixo:
                    // ajdfpioeuiu6437829eifjr472389iu4uyre98u3jfgr984320542085                   .jpeg//.png    etc
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);

                    //Cria uma instância do client Blob Service e passa a string de conexão
                    var blobServiceClient = new BlobServiceClient(stringConexao);

                    //Obtém um container client usando o nome do container do blob
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

                    //Obtém um blob client usando o blob name
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    //Abre o fluxo de entrada do arquivo(foto)
                    using (var stream = arquivo.OpenReadStream())
                    {
                        //Carrega o arquivo(foto) para o blob storage de forma assíncrona
                        await blobClient.UploadAsync(stream, true);
                    }

                    //Retorna a URI do blob como uma string
                    return blobClient.Uri.ToString();
                }
                else
                {
                    //Retorna a URI de uma imagem padrão caso nenhum arquivo seja enviado
                    return "https://blobvitalhubeduardo.blob.core.windows.net/containervitalhubeduardo/profilepattern.png";
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}