using System;

namespace mobster_backend.DTOs.Read
{
    public class FamilyDto
    {
        public Guid FamilyId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime AddedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int MemberCount { get; set; }
        public Guid AdminUserId { get; set; }
        public string AdminName { get; set; }

    }
}
