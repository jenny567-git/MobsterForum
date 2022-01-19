using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> AddFamilyAsync(SetFamilyViewModel model)
        {
            try
            {
                await familyService.AddFamily(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
    }
}
