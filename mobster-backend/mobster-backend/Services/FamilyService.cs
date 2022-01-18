using mobster_backend.Database;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.Services
{
    public class FamilyService : IFamilyService
    {
        private readonly MobsterContext _context;
        public FamilyService(MobsterContext context)
        {
            _context = context;
        }
       
        public Task AddFamily(string name, IEnumerable<User> users)
        {
            throw new NotImplementedException();
        }

        public Task DeleteFamily()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Family>> GetFamilies()
        {
            throw new NotImplementedException();
        }

        public Task<Family> GetFamily(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task RemoveUserFromFamily()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Family>> UpdateFamilies()
        {
            throw new NotImplementedException();
        }
    }
}
