using System;
using System.Collections.Generic;

namespace mobster_backend.Models
{
    public class User
    {
        public Guid Id { get; set; } //auth0Id
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
        public bool IsBanned { get; set; } = false;

        public virtual ICollection<Family> Families { get; set; } = new HashSet<Family>();

        public User()
        {
        }

        public User(Guid id)
        {
            this.Id = id;
        }
    }

}
