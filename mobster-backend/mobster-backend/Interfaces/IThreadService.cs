using mobster_backend.Models;
using mobster_backend.ViewModels.Create;
using mobster_backend.ViewModels.Update;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IThreadService
    {
        Task CreateThread(SetThreadViewModel model);
        Task<IEnumerable<Thread>> GetThreadsByFamilyId(Guid familyId);
        Task<Thread> GetThread(Guid threadId);
        Task UpdateThread(Guid threadId, SetThreadViewModel model);
        Task DeleteThread(Guid threadId);
    }
}
