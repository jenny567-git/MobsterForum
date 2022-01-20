using Microsoft.EntityFrameworkCore;
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

        public async Task AddFamilyMember(Guid familyId, Guid userId)
        {
            var family = await context.Families.Include(f => f.FamilyMembers).FirstOrDefaultAsync(f => f.Id == familyId);
            var user = await context.Users.FindAsync(userId);
            
            family.FamilyMembers.Add(user);
            //checked, works
            family.MemberCount++;
            await context.SaveChangesAsync();
        }

        public async Task AddFamilyMembers(Guid familyId, IEnumerable<Guid> userIds)
        {
            var family = await context.Families.Include(f => f.FamilyMembers).FirstOrDefaultAsync(f => f.Id == familyId);
            
            foreach (var userId in userIds)
            {
                var newMember = await context.Users.FindAsync(userId);
                family.FamilyMembers.Add(newMember);
            }
            //TODO: check if it works
            family.MemberCount += userIds.Count();

            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Family>> GetFamilies()
        {
            return await context.Families.Include(f => f.Admin).ToListAsync();
        }

        public async Task<Family> GetFamily(Guid familyId)
        {
            return await context.Families.FindAsync(id);
        }

        public async Task<IEnumerable<User>> GetFamilyMembers(Guid familyId)
        {
            var family = await context.Families
                .Include(fm => fm.FamilyMembers)
                .FirstOrDefaultAsync(f => f.Id == familyId);
            
            return family.FamilyMembers.ToList();
        }

        public async Task RemoveUserFromFamily(Guid familyId, Guid userId)
        {
            //TODO: check if user is admin
            var user = await context.Users.FindAsync(userId);
            var family = await context.Families
                .Include(f => f.FamilyMembers)
                .FirstOrDefaultAsync(f => f.Id == familyId);
            family.FamilyMembers.Remove(user);
            //TODO: check = -1
            family.MemberCount--;
            await context.SaveChangesAsync();
        }

        public async Task RemoveUsersFromFamily(Guid familyId, IEnumerable<Guid> userIds)
        {
            var family = await context.Families.FindAsync(familyId);

            foreach (var id in userIds)
            {
                var user = await context.Users.FindAsync(id);
                family.FamilyMembers.Remove(user);
            }
            //TODO: check
            family.MemberCount -= userIds.Count();
            await context.SaveChangesAsync();
        }

        public async Task<Family> UpdateFamily(Guid familyId, SetFamilyViewModel model)
        {
            var family = await context.Families
                .Include(a => a.Admin)
                .FirstOrDefaultAsync(f => f.Id == familyId);
            
            family.Description = model.Description;
            family.UpdatedAt = DateTime.Now;
            
            //update admin
            if (family.Admin.UserId != model.AdminId)
            {
                //TODO: check if new admin is a member of the family
                var admin = await context.Admins.FirstOrDefaultAsync(a => a.UserId == family.Admin.UserId && a.FamilyId == family.Id);
                admin.UserId = model.AdminId;
                admin.UpdatedAt = DateTime.Now;
            }

            await context.SaveChangesAsync();

            return family;
        }
        public Task DeleteFamily(Guid familyId)
        {
            //TODO: implement
            throw new NotImplementedException();
        }
    }
}
