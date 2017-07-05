using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;
using WebApplicationBasic;
using vega.Extensions;

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
      if (!includeRelated)
      {
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

    public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj)
    {
      var query = dbContext.Vehicles
        .Include(v => v.Model)
        .ThenInclude(v => v.Make)
        .AsQueryable();

      query = query.ApplyFiltering(queryObj);

      var columnMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
      {
        ["make"] = (v) => v.Model.Make.Name,
        ["model"] = (v) => v.Model.Name,
        ["contactName"] = (v) => v.ContactName,
        ["id"] = (v) => v.Id
      };
      query = query.ApplyOrdering(queryObj, columnMap);
      var result = new QueryResult<Vehicle>();
      result.TotalItems = await query.CountAsync();
      query = query.ApplyPaging(queryObj);
      result.Items = await query.ToListAsync();

      return result;
    }


  }
}
