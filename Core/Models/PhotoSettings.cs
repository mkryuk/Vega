using System.IO;
using System.Linq;

namespace vega.Core.Models
{
  public class PhotoSettings
  {
    public int MaxFileSize { get; set; }
    public string[] AcceptedFileTypes { get; set; }
    public bool IsSupported(string fileName)
    {
      return AcceptedFileTypes.Any(t => t == Path.GetExtension(fileName).ToLower());
    }
  }
}
