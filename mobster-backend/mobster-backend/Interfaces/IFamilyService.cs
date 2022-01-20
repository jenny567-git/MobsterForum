using mobster_backend.DTOs.Write;
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
        Task AddFamily(SetFamilyDto model);
        Task<IEnumerable<Family>> GetFamilies();
        Task<Family> GetFamily(Guid familyId);
        Task<IEnumerable<User>> GetFamilyMembers(Guid familyId);
        Task AddFamilyMember(Guid familyId, Guid userId);
        Task AddFamilyMembers(Guid familyId, IEnumerable<Guid> userIds);
        
        Task<Family> UpdateFamily(Guid familyId, SetFamilyViewModel model);

        /// <summary>
        /// Only if admin or site admin
        /// </summary>
        /// <param name="familyId"></param>
        /// <returns></returns>
        Task DeleteFamily(Guid familyId);
        Task RemoveUserFromFamily(Guid familyId, Guid userId);
        Task RemoveUsersFromFamily(Guid familyId, IEnumerable<Guid> userIds);

    }
}
