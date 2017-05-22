using System.Threading.Tasks;
using vega.Core;

namespace vega.Persistence
{
  class UnitOfWork : IUnitOfWork
  {
    private readonly VegaDbContext dbContext;
    public UnitOfWork(VegaDbContext dbContext)
    {
      this.dbContext = dbContext;
    }
    public async Task CompleteAsync()
    {
      await dbContext.SaveChangesAsync();
    }
  }
}
