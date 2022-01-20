using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mobster_backend.DTOs.Write;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using mobster_backend.ViewModels.Create;
using System;
using System.Collections.Generic;
using System.Linq;
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
        
        [HttpPost("/addMembers/")]
        public async Task<IActionResult> AddFamilyMembersAsync(Guid familyId, IEnumerable<Guid> userIds)
        {
            try
            {
                await familyService.AddFamilyMembers(familyId, userIds);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return StatusCode(201);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetFamiliesAsync()
        {
            try
            {
                var families = await familyService.GetFamilies();
                return Ok(families);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }
        
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
        
        [HttpPut]
        public async Task<IActionResult> UpdateFamilyAsync(Guid familyId, SetFamilyViewModel model)
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
