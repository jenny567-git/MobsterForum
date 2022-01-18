using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.ViewModels.Create
{
    public class SetFamilyViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid AdminId { get; set; }

    }
}
