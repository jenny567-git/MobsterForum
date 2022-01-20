using mobster_backend.DTOs.Write;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IUserService
    {
        Task AddUser(SetUserDto model);
    }
}
