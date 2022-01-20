using System;

namespace mobster_backend.DTOs.Write
{
    public class SetBlockedMemberDto
    {
        public Guid FamilyId { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; }
    }
}
