using System;

namespace mobster_backend.Models
{
    public class BannedMember
    {
        public Family Family { get; set; }
        public Guid FamilyId { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }
    }
}
