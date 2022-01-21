using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mobster_backend.DTOs.Write;
using mobster_backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddUserAsync(Guid userId)
        {
            try
            {
                await userService.AddUser(userId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return StatusCode(201);
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> TestAuth()
        {
            return Ok(null);
        }
    }
}
