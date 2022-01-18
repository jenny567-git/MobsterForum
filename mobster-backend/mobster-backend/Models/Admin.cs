using System;

namespace mobster_backend.Models
{
    public class Admin
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid FamilyId { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual User User { get; set; }
        public virtual Family Family { get; set; }
    }
}
