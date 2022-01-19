using mobster_backend.ViewModels.Create;
using System;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IBlockService
    {
        Task BlockUserFromFamily(SetBlockedMemberViewModel model);

        Task RemoveBlockedUserFromFamily(SetBlockedMemberViewModel model);

    }
}
