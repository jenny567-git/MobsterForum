using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.DTOs.Write
{
    public class SetFamilyDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid AdminId { get; set; }

    }
}
