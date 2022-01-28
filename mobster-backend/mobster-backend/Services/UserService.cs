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

        public async Task<UserDto> AddUser(string authId, string userName)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.AuthId == authId);

            if (user == null)
            {
                user = new User(authId, userName);
                context.Users.Add(user);
                await context.SaveChangesAsync();
            }

            return user.ToUserDto();
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return users.ToUserDtos();
        }
    }
}
