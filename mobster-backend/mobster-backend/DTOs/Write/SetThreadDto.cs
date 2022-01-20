using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.DTOs.Write
{
    public class SetThreadDto
    {
        public Guid FamilyId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public Guid AuthorId { get; set; }

    }
}
