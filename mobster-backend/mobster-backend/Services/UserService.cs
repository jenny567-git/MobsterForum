using Microsoft.EntityFrameworkCore;
using mobster_backend.Database;
using mobster_backend.DTOs.Read;
using mobster_backend.Extensions;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobster_backend.Services
{
    public class UserService : IUserService
    {
        private readonly MobsterContext context;

        public UserService(MobsterContext context)
        {
            this.context = context;
        }

        public async Task AddUser(Guid userId)
        {
            var user = new User(userId);
            context.Users.Add(user);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return users.ToUserDtos();
        }
    }
}
