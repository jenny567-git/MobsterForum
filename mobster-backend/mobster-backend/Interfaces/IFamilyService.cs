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
        Task<IEnumerable<User>> GetFamilyMembers(Guid familyId);
        Task AddFamilyMember(Guid familyId, SetUserViewModel model);
        Task AddFamilyMembers(Guid familyId, IEnumerable<SetUserViewModel> models);
        
        Task<Family> UpdateFamily(Guid familyId, SetFamilyViewModel model);
        
        /// <summary>
        /// Only if admin or site admin
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteFamily(Guid id);
        Task RemoveUserFromFamily(Guid userId, Guid familyId);
        Task RemoveUsersFromFamily(IEnumerable<Guid> userIds, Guid familyId);

    }
}
