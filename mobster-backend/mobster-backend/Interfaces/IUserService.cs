using mobster_backend.ViewModels.Create;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IUserService
    {
        Task AddUser(Guid userId);
    }
}
