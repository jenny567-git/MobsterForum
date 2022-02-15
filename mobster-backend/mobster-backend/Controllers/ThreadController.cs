using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mobster_backend.DTOs.Write;
using mobster_backend.Exceptions;
using mobster_backend.Interfaces;
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

        /// <summary>
        /// Gets a single thread by thread id
        /// </summary>
        /// <param name="threadId">The given id for the thread</param>
        /// <returns>A single thread</returns>
        [HttpGet("{threadId}")]
        public async Task<IActionResult> Get(Guid threadId)
        {
            try
            {
                var thread = await threadService.GetThread(threadId);
                return Ok(thread);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }

        /// <summary>
        /// Gets all threads or search by thread title
        /// </summary>
        /// <returns>A single thread</returns>
#nullable enable
        [HttpGet()]
        public async Task<IActionResult> GetThreads(string? searchstring)
#nullable disable
        {
            try
            {
                var thread = await threadService.GetThreads(searchstring);
                return Ok(thread);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }

        /// <summary>
        /// Get all threads belonging to the given family
        /// </summary>
        /// <param name="familyId">The provided family id</param>
        /// <returns></returns>
        [HttpGet("threads/{familyId}")]
        public async Task<IActionResult> GetThreadsByFamilyId(Guid familyId)
        {
            try
            {
                var threads = await threadService.GetThreadsByFamilyId(familyId);
                return Ok(threads);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Creates a new thread in an existing family. Role: Anyone
        /// </summary>
        /// <param name="model">The viewmodel used to represent the thread entity</param>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddThread(SetThreadDto model)
        {
            try
            {
                await threadService.AddThread(model);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        /// <summary>
        /// Updates an existing thread. Role: anyone.
        /// </summary>
        /// <param name="id">the id for the thread to be updated</param>
        /// <param name="model">The viewmodel used to represent the thread entity</param>
        /// <returns></returns>
        [HttpPut]
        //[Authorize]
        public async Task<IActionResult> UpdateThread(Guid id, SetThreadDto model)
        {
            try
            {
                await threadService.UpdateThread(id,model);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        /// <summary>
        /// Toggles the IsCensored flag on a single post. Role: GroupAdmin and up.
        /// </summary>
        /// <param name="threadId">The id of the post to be censored/uncensored</param>
        /// <returns></returns>
        [HttpPut("censor/{threadId}")]
        //[Authorize(Policy = "GroupAdmin")]
        public async Task<IActionResult> ToggleCensorThread(Guid threadId)
        {
            try
            {
                await threadService.ToggleCensorThread(threadId);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        /// <summary>
        /// Deletes an existing thread. Role: Anyone.
        /// </summary>
        /// <param name="id">The id of the thread to be deleted</param>
        /// <returns></returns>
        [HttpDelete]
        //[Authorize]
        public async Task<IActionResult> DeleteThread(Guid id)
        {
            try
            {
                await threadService.DeleteThread(id);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        
    }
}
