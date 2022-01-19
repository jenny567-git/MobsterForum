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
    public class FamilyService : IFamilyService
    {
        private readonly MobsterContext context;
        public FamilyService(MobsterContext context)
        {
            this.context = context;
        }
       
        public async Task AddFamily(SetFamilyViewModel model)
        {
            //create family
            var family = new Family(model.Name, model.Description);

            var user = await context.Users.FindAsync(model.AdminId);
            family.FamilyMembers.Add(user);
            
            context.Families.Add(family);
            
            //create admin
            var admin = new Admin(model.AdminId, family.Id);

            context.Admins.Add(admin);

            await context.SaveChangesAsync();
        }

        public Task DeleteFamily()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Family>> GetFamilies()
        {
            throw new NotImplementedException();
        }

        public Task<Family> GetFamily(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task RemoveUserFromFamily()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Family>> UpdateFamilies()
        {
            throw new NotImplementedException();
        }
    }
}
