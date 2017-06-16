using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;

namespace vega.Persistence
{
  public class PhotoRepository : IPhotoRepository
  {
    private readonly VegaDbContext dbContext;
    public PhotoRepository(VegaDbContext dbContext)
    {
      this.dbContext = dbContext;

    }

    public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
    {
      return await dbContext.Photos
        .Where((photo) => photo.VehicleId == vehicleId)
        .ToListAsync();
    }

  }
}
