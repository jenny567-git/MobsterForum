using Microsoft.EntityFrameworkCore;
using mobster_backend.Database;
using mobster_backend.DTOs.Write;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using System;
using System.Threading.Tasks;

namespace mobster_backend.Services
{
    public class BlockService : IBlockService
    {
        private readonly MobsterContext context;
        public BlockService(MobsterContext context)
        {
            this.context = context;
        }
        public async Task BlockUserFromFamily(SetBlockedMemberDto model)
        {
            var user = await context.Users.FindAsync(model.UserId);
            var family = await context.Families.Include(f => f.FamilyMembers).FirstOrDefaultAsync(f => f.FamilyId == model.FamilyId);
            
            if (family.FamilyMembers.Contains(user))
            {
                family.FamilyMembers.Remove(user);
                //checked, works
                family.MemberCount -= 1;
            }
            
            var blockedMember = new BlockedMember(model.FamilyId, model.UserId, model.Description);

            context.BlockedMembers.Add(blockedMember);
            
            await context.SaveChangesAsync();
        }

        public async Task RemoveBlockedUserFromFamily(Guid userId, Guid familyId)
        {
            var blockedMember = await context.BlockedMembers.FirstOrDefaultAsync(u => u.UserId == userId && u.FamilyId == familyId);
            context.BlockedMembers.Remove(blockedMember);
            await context.SaveChangesAsync();
        }

        public async Task ToggleUserBlockInApplication(Guid userId)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.UserId == userId);

            if (user.IsBanned)
            {
                user.IsBanned = false;
            }
            else
            {
                user.IsBanned = true;
            }

            await context.SaveChangesAsync();
        }
    }
}
