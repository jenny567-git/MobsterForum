using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using mobster_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> AddUser(string authId, string userName);

        Task<IEnumerable<UserDto>> GetUsers();
    }
}
