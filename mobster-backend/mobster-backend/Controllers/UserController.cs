using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mobster_backend.DTOs.Write;
using mobster_backend.Interfaces;
using mobster_backend.Models;
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

        /// <summary>
        /// Adds a user to the db if it doesn't already exist. This endpoint bridges between frontend and auth0
        /// </summary>
        /// <returns>A User Dto</returns>
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddUserAsync(SetUserDto model)
        {
            try
            {
                var user = await userService.AddUser(model);
                return Ok(user);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> TestAuth()
        {
            return Ok(null);
        }

        [HttpGet("allUsers")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await userService.GetUsers();
                return Ok(users);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
