using Microsoft.EntityFrameworkCore;
using mobster_backend.Database;
using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
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

        public async Task<UserDto> AddUser(SetUserDto model)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.AuthId == model.AuthId);

            if (user == null)
            {
                user = new User(model);
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

        public async Task<UserDto> GetUser(Guid userId)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            return user.ToUserDto();
        }

        public async Task<UserDto> ToggleUserActive(Guid userId)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            user.IsActive = !user.IsActive;
            await context.SaveChangesAsync();
            return user.ToUserDto();
        }
    }
}
