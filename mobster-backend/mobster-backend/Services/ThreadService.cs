using Microsoft.EntityFrameworkCore;
using mobster_backend.Database;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using mobster_backend.ViewModels.Create;
using mobster_backend.ViewModels.Update;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobster_backend.Services
{
    public class ThreadService : IThreadService
    {
        private readonly MobsterContext context;
        public ThreadService(MobsterContext context)
        {
            this.context = context;
        }
        public async Task CreateThread(SetThreadViewModel model)
        {
            //var user = new User { Id = new Guid("6894c9dd-3a91-4da9-b2e0-ecc4670e6c14") };
            //var family = new Family { Id = new Guid("84c4236c-0aaf-449a-8f4d-b920129a9b87"), Name = "family1", Description="Description1" };
            var thread = new Thread(model.Title, model.Content, model.FamilyId, model.AuthorId);
            context.Threads.Add(thread);
            await context.SaveChangesAsync();
            
        }

        public Task DeleteThread(Guid threadId)
        {
            throw new NotImplementedException();
        }

        public Task<Thread> GetThread(Guid threadId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Thread>> GetThreadsByFamilyId(Guid familyId)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateThread(Guid threadId, SetThreadViewModel model)
        {
            var thread = await context.Threads.FirstOrDefaultAsync(t => t.Id == threadId);
            thread.Title = model.Title;
            thread.Content = model.Content;

            await context.SaveChangesAsync();

        }
    }
}
