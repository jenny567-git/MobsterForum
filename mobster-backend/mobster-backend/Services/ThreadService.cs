using Microsoft.EntityFrameworkCore;
using mobster_backend.Database;
using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using mobster_backend.Exceptions;
using mobster_backend.Extensions;
using mobster_backend.Interfaces;
using mobster_backend.Models;
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
        public async Task AddThread(SetThreadDto model)
        {
            var thread = new Thread(model.Title, model.Content, model.FamilyId, model.AuthorId);

            context.Threads.Add(thread);

            await context.SaveChangesAsync();
        }

        public async Task UpdateThread(Guid threadId, SetThreadDto model)
        {
            var thread = await context.Threads.FirstOrDefaultAsync(t => t.ThreadId == threadId);

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
                .FirstOrDefaultAsync(t => t.ThreadId == threadId);

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

        public async Task<ThreadDto> GetThread(Guid threadId)
        {
            var thread = await context.Threads
                //.Include(t => t.Family)
                //.Include(t => t.Author)
                //.Include(t => t.Posts)
                .FirstOrDefaultAsync(t => t.ThreadId == threadId);

            if (thread == null)
            {
                throw new DbNotFoundException($"No thread with id {threadId} exists in the database.");
            }
            else
            {
                return thread.ToThreadDto();
            }
        }

        public async Task<IEnumerable<ThreadDto>> GetThreadsByFamilyId(Guid familyId)
        {
            var threads = await context.Threads
                //.Include(t => t.Family)
                //.Include(t => t.Author)
                //.Include(t => t.Posts)
                .Where(f => f.FamilyId == familyId)
                .ToListAsync();

            if (!threads.Any())
            {
                throw new DbNotFoundException($"The family with id {familyId} does not have any threads in the database.");
            }
            else
            {
                return threads.ToThreadDtos();
            }
        }


    }
}
