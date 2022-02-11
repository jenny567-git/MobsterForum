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
        /// Adds a user to the db if it doesn't already exist. This endpoint bridges between frontend and auth0. Role: open
        /// </summary>
        /// <returns>A User Dto</returns>
        [HttpPost]
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
        
        /// <summary>
        /// Role: Anyone
        /// </summary>
        /// <param name="authId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("ToggleUserActive")]
        public async Task<IActionResult> ToggleUserActive(string authId)
        {
            try
            {
                var user = await userService.GetUserByAuthId(authId);
                user = await userService.ToggleUserActive(user.UserId);
                return Ok(user);
            }
            catch (Exception e)
            {

                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Role: Anyone
        /// </summary>
        /// <param name="sub"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("ChangeUserEmail")]
        public async Task<IActionResult> ChangeUserEmail(string sub, string email)
        {
            try
            {
                var response = Auth0.Methods.ChangeEmail(sub, email);
                return Ok(response);

            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Role: anyone
        /// </summary>
        /// <param name="sub"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(string sub)
        {
            try
            {
                var response = Auth0.Methods.CreateChangePasswordTicket(sub);
                string link = response.Content.ToString();
                link = link.Substring(11);
                string link2 = link.Remove(link.Length - 2, 2);
                return Ok(link2);
            }
            catch
            {
                return null;
            }
        }

        

    }
}
