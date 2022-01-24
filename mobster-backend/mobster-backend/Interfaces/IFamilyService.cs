using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using mobster_backend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IFamilyService
    {
        Task AddFamily(SetFamilyDto model);
        Task<IEnumerable<FamilyDto>> GetFamilies();
        Task<FamilyDto> GetFamily(Guid familyId);
        Task<IEnumerable<UserDto>> GetFamilyMembers(Guid familyId);
        Task AddFamilyMember(Guid familyId, Guid userId);
        Task AddFamilyMembers(Guid familyId, IEnumerable<Guid> userIds);
        
        Task<FamilyDto> UpdateFamily(Guid familyId, SetFamilyDto model);

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
