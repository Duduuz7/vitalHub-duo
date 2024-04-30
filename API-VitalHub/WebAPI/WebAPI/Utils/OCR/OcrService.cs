using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptKey = "dd90934fa05d436b9328e00aecf1cffe";

        private readonly string _endpoint = "https://cvvitalhub-heitor.cognitiveservices.azure.com/";

        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptKey))
                {
                    Endpoint = _endpoint
                };

                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                return ProcessoRecognitionResult (ocrResult);
            }
            catch (Exception ex)
            {
                return "Erro ao reconhecer o texto: " + ex.Message;
            }
        }

        private static string ProcessoRecognitionResult(OcrResult result)
        {
            try
            {
                string recognizedText = "";

                foreach (var region in result.Regions)
                {
                    foreach (var line in region.Lines)
                    {
                        foreach (var word in line.Words)
                        {
                            recognizedText += word.Text;
                        }
                        recognizedText += "\n";
                     }
                }
                return recognizedText;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
