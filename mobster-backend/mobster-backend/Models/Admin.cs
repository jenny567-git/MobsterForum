using System;

namespace mobster_backend.Models
{
    public class Admin
    {
        public Guid AdminId { get; set; }
        public Guid UserId { get; set; }
        public Guid FamilyId { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual User User { get; set; }
        public virtual Family Family { get; set; }

        public Admin(Guid userId, Guid familyId)
        {
            this.UserId = userId;
            this.FamilyId = familyId;
            UpdatedAt = DateTime.Now;
            CreatedAt = DateTime.Now;
        }
    }

}
