using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IBlockService
    {
        Task BlockUserFromFamily(SetBlockedMemberDto model);

        Task RemoveBlockedUserFromFamily(Guid userId, Guid familyId);

        Task ToggleUserBlockInApplication(SetUserDto model);

        Task<IEnumerable<UserDto>> GetBlockedUserByFamily(Guid familyId);
    }
}
