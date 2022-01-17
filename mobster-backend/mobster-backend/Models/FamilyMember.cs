using System;

namespace mobster_backend.Models
{
    public class FamilyMember
    {
        public Family Family { get; set; }
        public Guid FamilyId { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }
    }
}
