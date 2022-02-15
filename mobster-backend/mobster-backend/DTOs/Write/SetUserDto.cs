using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.DTOs.Write
{
    public class SetUserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string AuthId { get; set; }


    }
}
