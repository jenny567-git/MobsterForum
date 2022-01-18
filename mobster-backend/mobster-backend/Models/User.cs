using System;
using System.Collections.Generic;

namespace mobster_backend.Models
{
    public class User
    {
        public Guid Id { get; set; } //auth0Id
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsActive { get; set; }
        public bool IsBanned { get; set; }

        public virtual ICollection<Family> Families { get; set; }


        public User()
        {
            Families = new HashSet<Family>();
        }
    }

}
