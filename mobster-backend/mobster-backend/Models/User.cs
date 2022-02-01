using mobster_backend.DTOs.Write;
using System;
using System.Collections.Generic;

namespace mobster_backend.Models
{
    public class User
    {
        public Guid UserId { get; set; } 
        public string AuthId { get; set; } //auth0Id
        public string UserName { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }
        public bool IsActive { get; set; }
        public bool IsBanned { get; set; }

        public virtual ICollection<Family> Families { get; set; } 

        public User()
        {
        }

        public User(SetUserDto model)
        {
            this.UserId = model.Id;
            this.AuthId = model.AuthId;
            this.UserName = model.UserName;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            IsActive = true;
            IsBanned = false;
            Families = new HashSet<Family>();
        }

        public User(string authId, string userName)
        {
            this.UserId = Guid.NewGuid();
            this.AuthId = authId;
            this.UserName = userName;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            IsActive = true;
            IsBanned = false;
            Families = new HashSet<Family>();
        }
    }

}
