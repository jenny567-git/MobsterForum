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
    public class ReportService : IReportService
    {
        private readonly MobsterContext context;

        public ReportService(MobsterContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<ReportDto>> GetAllReports()
        {
            var reports = await context.Reports.Include(u => u.ObjectUser).Include(u => u.SubjectUser).ToListAsync();
            var reportDtos = reports.ToReportDtos();
            var result = new List<ReportDto>();
            foreach (var report in reportDtos)
            {
                if (report.PostId != null)
                {
                    //TODO: find a better solution
                    var post = await context.Posts.FindAsync(report.PostId);
                    report.Content = post.Content;
                    result.Add(report);
                }
                else
                {
                    var thread = await context.Threads.FindAsync(report.ThreadId);
                    report.Content = thread.Content;
                    report.ThreadTitle = thread.Title;
                    result.Add(report);
                }
            }
            return result;
        }

        public async Task AddReport(SetReportDto model)
        {
            var report = new Report(model);
            context.Reports.Add(report);
            await context.SaveChangesAsync();
        }

        public async Task DeleteReport(Guid reportId)
        {
            var report = await context.Reports.FindAsync(reportId);
            context.Reports.Remove(report);
            await context.SaveChangesAsync();
        }

    }
}
