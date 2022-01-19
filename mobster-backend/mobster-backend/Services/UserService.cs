using mobster_backend.Database;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using mobster_backend.ViewModels.Create;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task AddUser(SetUserViewModel model)
        {
            var user = new User(model.Id);
            context.Users.Add(user);
            await context.SaveChangesAsync();
        }
    }
}
