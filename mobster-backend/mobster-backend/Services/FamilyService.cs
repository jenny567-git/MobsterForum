using Microsoft.EntityFrameworkCore;
using mobster_backend.Database;
using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using mobster_backend.Extensions;
using mobster_backend.Interfaces;
using mobster_backend.Models;
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

        public async Task AddFamily(SetFamilyDto model)
        {
            //create family
            var family = new Family(model.Name, model.Description);

            var user = await context.Users.FindAsync(model.AdminId);
            family.FamilyMembers.Add(user);

            context.Families.Add(family);

            //create admin
            var admin = new Admin(model.AdminId, family.FamilyId);

            context.Admins.Add(admin);

            await context.SaveChangesAsync();
        }

        public async Task AddFamilyMember(Guid familyId, Guid userId)
        {
            var family = await context.Families.Include(f => f.FamilyMembers).FirstOrDefaultAsync(f => f.FamilyId == familyId);
            var user = await context.Users.FindAsync(userId);

            family.FamilyMembers.Add(user);
            family.MemberCount = family.FamilyMembers.Count;
            await context.SaveChangesAsync();
        }

        public async Task AddFamilyMembers(Guid familyId, IEnumerable<Guid> userIds)
        {
            var family = await context.Families.Include(f => f.FamilyMembers).FirstOrDefaultAsync(f => f.FamilyId == familyId);

            foreach (var userId in userIds)
            {
                var newMember = await context.Users.FindAsync(userId);
                family.FamilyMembers.Add(newMember);
            }
            family.MemberCount = family.FamilyMembers.Count;

            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<FamilyDto>> GetFamilies()
        {
            var families = await context.Families.Include(f => f.Admin).ToListAsync();
            return families.ToFamilyDtos();
        }

        public async Task<FamilyDto> GetFamily(Guid familyId)
        {
            var family = await context.Families.Include(f => f.Admin).FirstOrDefaultAsync(f => f.FamilyId == familyId);
            var familyDto = family.ToFamilyDto();

            var admin = await context.Users.FindAsync(family.Admin.UserId);
            familyDto.AdminName = admin.UserName;

            return familyDto;
        }

        public async Task<IEnumerable<UserDto>> GetFamilyMembers(Guid familyId)
        {
            var family = await context.Families
                .Include(fm => fm.FamilyMembers)
                .FirstOrDefaultAsync(f => f.FamilyId == familyId);

            return family.FamilyMembers.ToList().ToUserDtos();
        }

        public async Task RemoveUserFromFamily(Guid familyId, Guid userId)
        {
            var user = await context.Users.FindAsync(userId);
            var family = await context.Families
                .Include(f => f.FamilyMembers)
                .FirstOrDefaultAsync(f => f.FamilyId == familyId);
            family.FamilyMembers.Remove(user);

            //check if user is admin
            var admin = await context.Admins.FirstOrDefaultAsync(a => a.UserId == userId && a.FamilyId == familyId);
            if (admin != null) context.Admins.Remove(admin);

            family.MemberCount = family.FamilyMembers.Count;
            await context.SaveChangesAsync();
        }

        public async Task RemoveUsersFromFamily(Guid familyId, IEnumerable<Guid> userIds)
        {
            var family = await context.Families
                .Include(f => f.FamilyMembers)
                .FirstOrDefaultAsync(f => f.FamilyId == familyId);

            foreach (var id in userIds)
            {
                var user = await context.Users.FindAsync(id);
                family.FamilyMembers.Remove(user);
            }
            family.MemberCount = family.FamilyMembers.Count;
            await context.SaveChangesAsync();
        }

        public async Task<FamilyDto> UpdateFamily(Guid familyId, SetFamilyDto model)
        {
            var family = await context.Families
                .Include(a => a.Admin)
                .Include(fm => fm.FamilyMembers)
                .FirstOrDefaultAsync(f => f.FamilyId == familyId);

            family.Name = model.Name;
            family.Description = model.Description;
            family.UpdatedAt = DateTime.Now;

            //update admin
            if (family.Admin.UserId != model.AdminId)
            {
                //check if new admin is a member of the family
                var newAdmin = await context.Users.FindAsync(model.AdminId);
                if (!family.FamilyMembers.Contains(newAdmin))
                {
                    throw new ArgumentException();
                }

                var admin = await context.Admins.FirstOrDefaultAsync(a => a.UserId == family.Admin.UserId && a.FamilyId == family.FamilyId);
                admin.UserId = model.AdminId;
                admin.UpdatedAt = DateTime.Now;
            }

            await context.SaveChangesAsync();

            return family.ToFamilyDto();
        }
        public async Task DeleteFamily(Guid familyId)
        {
            var family = await context.Families.FindAsync(familyId);
            context.Families.Remove(family);
            await context.SaveChangesAsync();
        }
    }
}
