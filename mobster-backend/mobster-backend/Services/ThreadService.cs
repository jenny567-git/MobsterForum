using Microsoft.EntityFrameworkCore;
using mobster_backend.Database;
using mobster_backend.Exceptions;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using mobster_backend.ViewModels.Create;
using mobster_backend.ViewModels.Update;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task AddThread(SetThreadViewModel model)
        {
            var thread = new Thread(model.Title, model.Content, model.FamilyId, model.AuthorId);

            context.Threads.Add(thread);

            await context.SaveChangesAsync();
        }

        public async Task UpdateThread(Guid threadId, SetThreadViewModel model)
        {
            var thread = await context.Threads.FirstOrDefaultAsync(t => t.Id == threadId);

            if (thread == null)
            {
                throw new DbNotFoundException($"No thread with id {threadId} exists in the database.");
            }
            else
            {
                thread.Title = model.Title;
                thread.Content = model.Content;

                await context.SaveChangesAsync();
            }

        }

        public async Task DeleteThread(Guid threadId)
        {
            var thread = await context.Threads
                .FirstOrDefaultAsync(t => t.Id == threadId);

            if (thread == null)
            {
                throw new DbNotFoundException($"No thread with id {threadId} exists in the database.");
            }
            else
            {
                context.Remove(thread);
                await context.SaveChangesAsync();
            }
        }

        public async Task<Thread> GetThread(Guid threadId)
        {
            var thread = await context.Threads
                .FirstOrDefaultAsync(t => t.Id == threadId);

            if (thread == null)
            {
                throw new DbNotFoundException($"No thread with id {threadId} exists in the database.");
            }
            else
            {
                //create Vm
                return thread;
            }
        }

        public async Task<IEnumerable<Thread>> GetThreadsByFamilyId(Guid familyId)
        {
            var threads = await context.Threads
                .Where(f => f.FamilyId == familyId)
                .ToListAsync();

            if (!threads.Any())
            {
                throw new DbNotFoundException($"The family with id {familyId} does not have any threads in the database.");
            }
            else
            {
                return threads;
            }
        }


    }
}
