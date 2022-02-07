using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mobster_backend.DTOs.Write;
using mobster_backend.Interfaces;
using System;
using System.Threading.Tasks;

namespace mobster_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService reportService;

        public ReportController(IReportService reportService)
        {
            this.reportService = reportService;
        }

        [HttpGet]
        public async Task<IActionResult> GetReports()
        {
            try
            {
                var reports = await reportService.GetAllReports();
                return Ok(reports);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> AddReport(SetReportDto model)
        {
            try
            {
                await reportService.AddReport(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
            return StatusCode(201);
        }
        
        [HttpDelete]
        public async Task<IActionResult> DeleteReport(Guid reportId)
        {
            try
            {
                 await reportService.DeleteReport(reportId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
                return Ok();
        }
    }
}
