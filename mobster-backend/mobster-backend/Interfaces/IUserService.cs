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
        Task AddUser(Guid userId);

        Task<IEnumerable<User>> GetUsers();
    }
}
