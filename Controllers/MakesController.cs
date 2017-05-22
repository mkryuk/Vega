using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core.Models;
using vega.Persistence;
using WebApplicationBasic;

namespace vega.Controllers
{
  public class MakesController : Controller
  {
    private readonly VegaDbContext dbContext;
    private readonly IMapper mapper;
    public MakesController(VegaDbContext dbContext, IMapper mapper)
    {
      this.dbContext = dbContext;
      this.mapper = mapper;
    }
    [HttpGet("/api/makes")]
    public IEnumerable<MakeResource> GetMakes()
    {
      var makes = this.dbContext.Makes.Include(m => m.Models).ToList();
      return this.mapper.Map<List<Make>, List<MakeResource>>(makes);
    }

  }
}
