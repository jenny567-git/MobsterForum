using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mobster_backend.DTOs.Write;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using RestSharp;
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
        private string BearerToken;

        public UserController(IUserService userService)
        {
            this.userService = userService;

            //For auth0 management token
            //BearerToken = GetBearerToken();

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

        //[HttpGet]
        //[Authorize]
        //public async Task<IActionResult> TestAuth()
        //{
        //    return Ok(null);
        //}

        [HttpGet]
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

        [HttpPost("ToggleUserActive")]
        public async Task<IActionResult> ToggleUserActive(Guid userId)
        {
            try
            {
            var user = await userService.ToggleUserActive(userId);
            return Ok(user);
            }
            catch (Exception e)
            {

                return StatusCode(500, e);
            }
        }

        [HttpPost("ChangeUserEmail")]
        public async Task<IActionResult> ChangeUserEmail(Guid userId, string email)
        {
            try
            {
                var user = await userService.GetUser(userId);
                var response = Auth0.Methods.ChangeEmail(user.AuthId, email);
                return Ok(response);
                
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(Guid userId)
        {
            try
            {
                var user = await userService.GetUser(userId);
                var response = Auth0.Methods.CreateChangePasswordTicket(user.AuthId);
                return Ok(response.Content);
            }
            catch
            {
                return null;
            }
        }

        

    }
}
