using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega.Core.Models;

namespace vega.Core
{
  public class PhotoService : IPhotoService
  {
    private readonly IUnitOfWork uow;
    private readonly IPhotoStorage photoStorage;
    public PhotoService(IUnitOfWork uow, IPhotoStorage photoStorage)
    {
      this.photoStorage = photoStorage;
      this.uow = uow;

    }
    public async Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadFolderPath)
    {
      var fileName = await photoStorage.StorePhoto(uploadFolderPath, file);
      var photo = new Photo { FileName = fileName };
      vehicle.Photos.Add(photo);
      await uow.CompleteAsync();
      return photo;
    }
  }
}
