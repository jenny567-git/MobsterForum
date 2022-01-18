using System;

namespace mobster_backend.Models
{
    public class BlockedMember
    {
        public Guid Id { get; set; }
        public Guid FamilyId { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; }
        public DateTime BlockedAt { get; set; }

        public virtual Family Family { get; set; }
        public virtual User User { get; set; }
    }
}
