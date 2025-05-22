using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace DeskPro
{
    class Program
    {
        static void Main(string[] args)
        {
            const Int32 BufferSize = 128;
            const string ImportFile = "DeskPro";

            using (var streamWriter = new StreamWriter(ImportFile + ".log"))
            using (var streamReader = new StreamReader(File.OpenRead(ImportFile + ".TXT"), Encoding.UTF8, true, BufferSize))
            {
                String line;
                int i = 0;
                while ((line = streamReader.ReadLine()) != null)
                {
                    var result = SendJson(line);
                    result = result.Replace('\n', ' ');
                    Console.WriteLine("Processing " + line);
                    streamWriter.WriteLine("line " + i + ":" + result);
                    i++;
                }
            }
        }

        private static string SendJson(string content)
        {
            var resultContent = string.Empty;

            using (HttpClient client = new HttpClient(new HttpClientHandler { ClientCertificateOptions = ClientCertificateOption.Automatic }))
            using (HttpRequestMessage request = new HttpRequestMessage())
            {
                request.RequestUri = new Uri("http://asi.deskpro.com/api/v2/organizations");
                request.Method = new HttpMethod("POST");
                client.Timeout = new TimeSpan(0, 2, 0); //2 minutes timeout
                //set the content into the request if available
                UTF8Encoding encoding = new UTF8Encoding();
                byte[] postBytes = encoding.GetBytes(content);
                request.Content = new StreamContent(new MemoryStream(postBytes));
                request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
                request.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.168 Safari/535.19");
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Headers.Add("Authorization", "key 1:Q8PZSHDDTPSPDJ5CT8DKD6T85");

                // Execute the request
                if (ServicePointManager.Expect100Continue) ServicePointManager.Expect100Continue = false;

                using (var response = client.SendAsync(request).Result)
                {
                    resultContent = response.Content.ReadAsStringAsync().Result;
                    if (response.IsSuccessStatusCode) return resultContent.ToString();
                    else if (string.IsNullOrEmpty(resultContent)) resultContent = string.Format("The web request was not successfully completed: (code {0})", response.StatusCode);
                    else resultContent = string.Format("The web request was not successfully completed: (code {0}) with error {1}", response.StatusCode, resultContent);
                }
            }

            return resultContent;
        }
    }
}
