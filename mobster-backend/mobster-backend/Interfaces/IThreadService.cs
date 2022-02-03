using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using mobster_backend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IThreadService
    {
        Task AddThread(SetThreadDto model);
#nullable enable
        Task<IEnumerable<ThreadDtoOverview>> GetThreads(string? searchstring);
#nullable disable
        Task<IEnumerable<ThreadDto>> GetThreadsByFamilyId(Guid familyId);
        Task<ThreadDto> GetThread(Guid threadId);
        Task UpdateThread(Guid threadId, SetThreadDto model);
        Task DeleteThread(Guid threadId);
    }
}
