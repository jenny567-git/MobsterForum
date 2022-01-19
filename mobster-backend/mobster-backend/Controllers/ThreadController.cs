using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mobster_backend.Interfaces;
using mobster_backend.ViewModels.Create;
using System;
using System.Threading.Tasks;

namespace mobster_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThreadController : ControllerBase
    {
        private readonly IThreadService threadService;

        public ThreadController(IThreadService threadService)
        {
            this.threadService = threadService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateThread(SetThreadViewModel model)
        {
            try
            {
                await threadService.CreateThread(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateThread(Guid id,SetThreadViewModel model)
        {
            try
            {
                await threadService.UpdateThread(id,model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
    }
}
