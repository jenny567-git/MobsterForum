using Microsoft.EntityFrameworkCore;
using mobster_backend.Database;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using mobster_backend.ViewModels.Create;
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
        public async Task BlockUserFromFamily(SetBlockedMemberViewModel model)
        {
            var user = await context.Users.FindAsync(model.UserId);
            var family = await context.Families.Include(f => f.FamilyMembers).FirstOrDefaultAsync(f => f.Id == model.FamilyId);
            
            if (family.FamilyMembers.Contains(user))
            {
                family.FamilyMembers.Remove(user);
                family.MemberCount -= 1;
            }
            
            var blockedMember = new BlockedMember(model.FamilyId, model.UserId, model.Description);

            context.BlockedMembers.Add(blockedMember);
            
            await context.SaveChangesAsync();
        }

        public async Task RemoveBlockedUserFromFamily(SetBlockedMemberViewModel model)
        {
            var blockedMember = await context.BlockedMembers.FirstOrDefaultAsync(u => u.UserId == model.UserId && u.FamilyId == model.FamilyId);
            context.BlockedMembers.Remove(blockedMember);
            await context.SaveChangesAsync();
        }
    }
}
