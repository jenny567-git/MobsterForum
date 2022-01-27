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

        [HttpPost]
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

        public async Task<IActionResult> ToggleUserBlockInApplicationAsync(SetUserDto model)
        {
            try
            {
                await blockService.ToggleUserBlockInApplication(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
    }
}
