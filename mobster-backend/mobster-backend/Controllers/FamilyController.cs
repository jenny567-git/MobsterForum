using Microsoft.AspNetCore.Mvc;
using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using mobster_backend.Exceptions;
using mobster_backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobster_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyController : ControllerBase
    {
        private readonly IFamilyService familyService;

        public FamilyController(IFamilyService familyService)
        {
            this.familyService = familyService;
        }

        /// <summary>
        /// Create a new family
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddFamilyAsync(SetFamilyDto model)
        {
            try
            {
                await familyService.AddFamily(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return StatusCode(201);
        }
        
        /// <summary>
        /// Add an user to an existing family
        /// </summary>
        /// <param name="familyId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPost("/addMember/")]
        public async Task<IActionResult> AddFamilyMemberAsync(Guid familyId, Guid userId)
        {
            try
            {
                await familyService.AddFamilyMember(familyId, userId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return StatusCode(201);
        }

        /// <summary>
        /// Adds a list of members to an existing family
        /// </summary>
        /// <param name="familyId"></param>
        /// <param name="users"></param>
        /// <returns></returns>
        [HttpPost("/addMembers/")]
        public async Task<IActionResult> AddFamilyMembersAsync(Guid familyId, IEnumerable<UserDto> users)
        {
            try
            {
                await familyService.AddFamilyMembers(familyId, users);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return StatusCode(201);
        }
        
        /// <summary>
        /// Get all families
        /// </summary>
        /// <returns></returns>
        [HttpGet]
#nullable enable

        public async Task<IActionResult> GetFamiliesAsync(string? searchstring)
#nullable disable
        {
            try
            {
                var families = await familyService.GetFamilies(searchstring);
                return Ok(families);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }

        /// <summary>
        /// Get top 5 families with most members
        /// </summary>
        /// <returns></returns>
        [HttpGet("top5")]
        public async Task<IActionResult> GetTopFamiliesAsync()
        {
            try
            {
                var families = await familyService.GetTop5Families();
                return Ok(families);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }

        /// <summary>
        /// Gets a list of families that the given user is a member of
        /// </summary>
        /// <param name="userId">The id of the requested user</param>
        /// <returns></returns>
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetFamiliesByUserId(Guid userId)
        {
            try
            {
                var families = await familyService.GetFamiliesByUserId(userId);
                return Ok(families);
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
        /// Gets a specific family
        /// </summary>
        /// <param name="familyId"></param>
        /// <returns></returns>
        [HttpGet("{familyId}")]
        public async Task<IActionResult> GetFamilyAsync(Guid familyId)
        {
            try
            {
                var family = await familyService.GetFamily(familyId);
                return Ok(family);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }
        
        /// <summary>
        /// Gets a list of members for a family
        /// </summary>
        /// <param name="familyId"></param>
        /// <returns></returns>
        [HttpGet("{familyId}/members")]
        public async Task<IActionResult> GetFamilyMembersAsync(Guid familyId)
        {
            try
            {
                var members = await familyService.GetFamilyMembers(familyId);
                return Ok(members);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
        /// <summary>
        /// Gets a list of members that's not a current member or blocked member of the family
        /// </summary>
        /// <param name="familyId"></param>
        /// <returns></returns>
        [HttpGet("{familyId}/invite")]
        public async Task<IActionResult> GetInvitableUsersByFamilyId(Guid familyId)
        {
            try
            {
                var users = await familyService.GetInvitableUsers(familyId);
                return Ok(users);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Removes an member from the family
        /// </summary>
        /// <param name="familyId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpDelete("/removeUser/")]
        public async Task<IActionResult> RemoveUserFromFamilyAsync(Guid familyId, Guid userId)
        {
            try
            {
                await familyService.RemoveUserFromFamily(familyId, userId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
        
        /// <summary>
        /// Removes a list of members from the family
        /// </summary>
        /// <param name="familyId">ID of the family</param>
        /// <param name="userIds">Id of the users</param>
        /// <returns></returns>
        [HttpDelete("/removeUsers/")]
        public async Task<IActionResult> RemoveUsersFromFamilyAsync(Guid familyId, IEnumerable<Guid> userIds)
        {
            try
            {
                await familyService.RemoveUsersFromFamily(familyId, userIds);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
        
        /// <summary>
        /// Deletes a family
        /// </summary>
        /// <param name="familyId"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteFamilyAsync(Guid familyId)
        {
            try
            {
                await familyService.DeleteFamily(familyId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
        
        /// <summary>
        /// Updates a family
        /// </summary>
        /// <param name="familyId"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdateFamilyAsync(Guid familyId, SetFamilyDto model)
        {
            try
            {
                var family = await familyService.UpdateFamily(familyId, model);
                return Ok(family);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }
    }
}
