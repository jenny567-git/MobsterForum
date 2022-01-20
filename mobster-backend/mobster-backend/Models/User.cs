using System;
using System.Collections.Generic;

namespace mobster_backend.Models
{
    public class User
    {
        public Guid UserId { get; set; } //auth0Id
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsBanned { get; set; } = false;

        public virtual ICollection<Family> Families { get; set; } 

        public User()
        {
        }

        public User(Guid id)
        {
            this.UserId = id;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            Families = new HashSet<Family>();
        }
    }

}
