using mobster_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IFamilyService
    {
        //Task AddFamily(Family family);
        Task AddFamily(string name, IEnumerable<User> users);
        Task<IEnumerable<Family>> GetFamilies();
        Task<Family> GetFamily(Guid id);
        Task<IEnumerable<Family>> UpdateFamilies();
        Task DeleteFamily();
        Task RemoveUserFromFamily();

    }
}
