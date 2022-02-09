using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IReportService
    {
        Task<IEnumerable<ReportDto>> GetAllReports();

        Task AddReport(SetReportDto model);

        Task DeleteReport(Guid reportId, bool censur);

    }
}
