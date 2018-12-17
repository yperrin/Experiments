using System.Collections.Generic;
using System.Threading.Tasks;

namespace asi.excit.common.Interfaces
{
    public interface IFileService
    {
        string Save(string content, string name, string url, IDictionary<string, string> config);
        string Save(byte[] content, string name, string url, IDictionary<string, string> config);
        Task<string> SaveAsync(string content, string name, string url, IDictionary<string, string> config);
        Task<string> SaveAsync(byte[] content, string name, string url, IDictionary<string, string> config);
        IList<string> GetFileList(string url, IDictionary<string, string> config);
        string Read(string url, IDictionary<string, string> config);
        bool FileExist(string url, IDictionary<string, string> config);
    }
}