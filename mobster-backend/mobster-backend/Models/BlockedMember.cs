using System;

namespace mobster_backend.Models
{
    public class BlockedMember
    {
        public Guid BlockedMemberId { get; set; }
        public Guid FamilyId { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; }
        public DateTime BlockedAt { get; set; }

        public virtual Family Family { get; set; }
        public virtual User User { get; set; }

        public BlockedMember() {}

        public BlockedMember(Guid familyId, Guid userId, string description)
        {
            FamilyId = familyId;
            UserId = userId;
            Description = description;
            BlockedAt = DateTime.Now;
       }
    }
}
