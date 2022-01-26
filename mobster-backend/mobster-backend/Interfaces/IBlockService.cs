using mobster_backend.DTOs.Write;
using System;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IBlockService
    {
        Task BlockUserFromFamily(SetBlockedMemberDto model);

        Task RemoveBlockedUserFromFamily(Guid userId, Guid familyId);

        Task ToggleUserBlockInApplication(Guid userId);

    }
}
