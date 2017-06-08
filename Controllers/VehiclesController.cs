using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core.Models;
using WebApplicationBasic;
using vega.Core;
using System.Collections.Generic;

namespace vega.Controllers
{
  [Route("/api/vehicles")]
  public class VehiclesController : Controller
  {
    private readonly IMapper autoMapper;
    private readonly IVehicleRepository repository;
    private readonly IUnitOfWork uow;
    public VehiclesController(IMapper autoMapper, IVehicleRepository repository, IUnitOfWork uow)
    {
      this.autoMapper = autoMapper;
      this.repository = repository;
      this.uow = uow;
    }
    [HttpPost]
    public async Task<IActionResult> CreateVehicle([FromBody]SaveVehicleResource vehicleResource)
    {
      // throw new Exception();
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      // var model = await dbContext.Models.FindAsync(vehicleResource.ModelId);
      // if (model == null)
      // {
      //   ModelState.AddModelError("ModelId", "Invalid model id");
      //   return BadRequest(ModelState);
      // }
      var vehicle = autoMapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
      vehicle.LastUpdate = DateTime.Now;
      repository.Add(vehicle);
      await uow.CompleteAsync();

      vehicle = await repository.GetVehicle(vehicle.Id);

      var result = autoMapper.Map<Vehicle, VehicleResource>(vehicle);
      return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVehicle(int id, [FromBody]SaveVehicleResource vehicleResource)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var vehicle = await repository.GetVehicle(id);

      autoMapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
      vehicle.LastUpdate = DateTime.Now;
      await uow.CompleteAsync();

      vehicle = await repository.GetVehicle(vehicle.Id);

      var result = autoMapper.Map<Vehicle, SaveVehicleResource>(vehicle);
      return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
      var vehicle = await repository.GetVehicle(id, includeRelated: false);

      if (vehicle == null)
        return NotFound();

      repository.Remove(vehicle);
      await uow.CompleteAsync();

      return Ok(id);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetVehicle(int id)
    {
      var vehicle = await repository.GetVehicle(id);

      if (vehicle == null)
      {
        return NotFound();
      }

      var vehicleResource = autoMapper.Map<Vehicle, VehicleResource>(vehicle);

      return Ok(vehicleResource);
    }

    [HttpGet]
    public async Task<QueryResultResource<VehicleResource>> GetVehicles(VehicleQueryResource filterResource)
    {
      var filter = autoMapper.Map<VehicleQueryResource, VehicleQuery>(filterResource);
      var queryResult = await repository.GetVehicles(filter);
      return autoMapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);
    }

  }
}
