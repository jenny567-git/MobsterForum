using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mobster_backend.DTOs.Write;
using mobster_backend.Interfaces;
using System;
using System.Threading.Tasks;

namespace mobster_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlockController : ControllerBase
    {
        private readonly IBlockService blockService;

        public BlockController(IBlockService blockService)
        {
            this.blockService = blockService;
        }

        /// <summary>
        /// Get all blocked members by family id
        /// </summary>
        /// <param name="familyId">Id of family</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetBlockUserByFamily(Guid familyId)
        {
            try
            {
                var blockedUsers = await blockService.GetBlockedUsersByFamily(familyId);
                return Ok(blockedUsers);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
        /// <summary>
        /// Blocks an user from a family. Role: GroupAdmin and above.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Policy = "GroupAdmin")]
        public async Task<IActionResult> BlockUserFromFamilyAsync(SetBlockedMemberDto model)
        {
            try
            {
                await blockService.BlockUserFromFamily(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return StatusCode(201);
        }
        
        /// <summary>
        /// Removes a currently blocked user from the family's black list. Role GroupdAdmin and up.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="familyId"></param>
        /// <returns></returns>
        [Authorize(Policy = "GroupAdmin")]
        [HttpDelete]
        public async Task<IActionResult> RemoveBlockUserFromFamilyAsync(Guid userId, Guid familyId)
        {
            try
            {
                await blockService.RemoveBlockedUserFromFamily(userId, familyId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        [HttpPut]
        //[Authorize(Policy = "AdminAccess")]
        public async Task<IActionResult> ToggleUserBlockInApplicationAsync(Guid userId)
        {
            try
            {
                await blockService.ToggleUserBlockInApplication(userId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
    }
}
