using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;

namespace vega.Controllers
{
  [Route("api/vehicles/{vehicleId}/photos")]
  public class PhotosController : Controller
  {
    private readonly IHostingEnvironment host;
    private readonly IMapper autoMapper;
    private readonly IVehicleRepository repository;
    private readonly PhotoSettings photoSettings;
    private readonly IPhotoRepository photoRepository;
    private readonly IPhotoService photoService;
    public PhotosController(
      IHostingEnvironment host, 
      IMapper autoMapper, 
      IVehicleRepository vehicleRepository, 
      IPhotoRepository photoRepository, 
      IOptionsSnapshot<PhotoSettings> options,
      IPhotoService photoService)
    {
      this.photoRepository = photoRepository;
      this.photoSettings = options.Value;
      this.repository = vehicleRepository;
      this.autoMapper = autoMapper;
      this.host = host;
      this.photoService = photoService;
    }
    [HttpGet]
    public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
    {
      var photos = await photoRepository.GetPhotos(vehicleId);
      return autoMapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
    }

    [HttpPost]
    public async Task<IActionResult> UploadPhoto(int vehicleId, IFormFile file)
    {
      var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);
      if (vehicle == null)
      {
        return NotFound();
      }

      if (file == null)
      {
        return BadRequest("File is empty");
      }
      if (file.Length <= 0)
      {
        return BadRequest("File is too small");
      }
      if (file.Length > photoSettings.MaxFileSize)
      {
        return BadRequest("File too large");
      }
      if (!photoSettings.IsSupported(file.FileName))
      {
        return BadRequest("File type not acceptable");
      }
      var uploadFolderPath = Path.Combine(this.host.WebRootPath, "uploads");
      var photo = await photoService.UploadPhoto(vehicle, file, uploadFolderPath);
      return Ok(Mapper.Map<Photo, PhotoResource>(photo));
    }
  }
}
