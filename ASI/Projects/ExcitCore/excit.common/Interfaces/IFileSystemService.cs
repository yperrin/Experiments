
namespace asi.excit.common.Interfaces
{
    public interface IFileSystemService
    {
        /// <summary>
        /// Reads the content of a file
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        string ReadContent(string fileName);

        /// <summary>
        /// Checks if the file can be found
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        bool Exists(string fileName);
    }
}
