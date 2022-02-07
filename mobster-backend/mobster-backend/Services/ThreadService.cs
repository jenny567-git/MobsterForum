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
            var thread = await context.Threads.FindAsync(threadId);

            if (thread == null)
            {
                throw new DbNotFoundException($"No thread with id {threadId} exists in the database.");
            }
            else
            {
                thread.Title = model.Title;
                thread.Content = model.Content;
                thread.UpdatedAt = DateTime.Now;

                await context.SaveChangesAsync();
            }

        }

        public async Task DeleteThread(Guid threadId)
        {
            var thread = await context.Threads
                .Include(t => t.Posts)
                .FirstOrDefaultAsync(t => t.ThreadId == threadId);

            if (thread == null)
            {
                throw new DbNotFoundException($"No thread with id {threadId} exists in the database.");
            }
            else
            {
                foreach (var post in thread.Posts)
                {
                    post.ThreadId = null;
                }
                context.Threads.Remove(thread);
                await context.SaveChangesAsync();
            }
        }

#nullable enable
        public async Task<IEnumerable<ThreadDtoOverview>> GetThreads(string? searchstring)
#nullable disable
        {
            var threads = new HashSet<Thread>();


            if (string.IsNullOrWhiteSpace(searchstring))
            {
                var result = await context.Threads.Include(t => t.Family).Include(a => a.Author).ToListAsync();
                threads = new HashSet<Thread>(result);
            }
            else
            {
                string[] subs = searchstring.ToLower().Split();
                foreach (string sub in subs)
                {
                    var result = await context.Threads.Include(t => t.Family).Include(a => a.Author).Where(f => f.Title.ToLower().Contains(sub)).ToListAsync();
                    threads.AddRange(result);
                }
            }

            return threads.ToThreadDtosOverview();
        }

        public async Task<ThreadDto> GetThread(Guid threadId)
        {
            var thread = await context.Threads
                .Include(t => t.Family)
                .ThenInclude(f => f.FamilyMembers)
                .Include(t => t.Family)
                .ThenInclude(f => f.Admin)
                .Include(t => t.Author)
                .Include(t => t.Posts)
                .ThenInclude(p => p.Author)
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
                .Include(t => t.Family)
                .ThenInclude(f => f.Admin)
                .Include(t => t.Author)
                .Include(t => t.Posts)
                .ThenInclude(p => p.Author)
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
