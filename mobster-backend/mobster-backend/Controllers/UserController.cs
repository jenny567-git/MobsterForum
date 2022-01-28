using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        /// <param name="authId">The unique auth0 id saved in the auth0 User db</param>
        /// <param name="userName">The unique username saved in the auth0 User db</param>
        /// <returns>A User Dto</returns>
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddUserAsync(string authId, string userName)
        {
            try
            {
                var user = await userService.AddUser(authId, userName);
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
