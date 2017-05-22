using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;
using WebApplicationBasic;

namespace vega.Persistence
{
  public class VehicleRepository : IVehicleRepository
  {
    private readonly VegaDbContext dbContext;
    public VehicleRepository(VegaDbContext dbContext)
    {
      this.dbContext = dbContext;
    }
    public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
    {
      if(!includeRelated) {
        return await dbContext.Vehicles.FindAsync(id);
      }
      return await dbContext.Vehicles
        .Include(v => v.Model)
        .ThenInclude(v => v.Make)
        .Include(v => v.Features)
        .ThenInclude(vf => vf.Feature)
        .SingleOrDefaultAsync(v => v.Id == id);
    }

    public void Add(Vehicle vehicle)
    {
      dbContext.Vehicles.Add(vehicle);
    }

    public void Remove(Vehicle vehicle)
    {
      dbContext.Vehicles.Remove(vehicle);
    }
  }
}
