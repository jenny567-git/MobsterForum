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
        Task<UserDto> AddUser(SetUserDto model);

        Task<IEnumerable<UserDto>> GetUsers();

        Task<UserDto> ToggleUserActive(Guid userId);

        Task<UserDto> GetUser(Guid userId);
        Task<UserDto> GetUserByAuthId(string authId);
    }
}
