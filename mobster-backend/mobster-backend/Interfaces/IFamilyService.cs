using mobster_backend.Models;
using mobster_backend.ViewModels.Create;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IFamilyService
    {
        Task AddFamily(SetFamilyViewModel model);
        Task<IEnumerable<Family>> GetFamilies();
        Task<Family> GetFamily(Guid id);
        Task<IEnumerable<Family>> UpdateFamilies();
        Task DeleteFamily();
        Task RemoveUserFromFamily();

    }
}
