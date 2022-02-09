using System;
using System.Collections;
using System.Collections.Generic;

namespace mobster_backend.DTOs.Read
{
    public class FamilyDto
    {
        public Guid FamilyId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AddedAt { get; set; }
        public string UpdatedAt { get; set; }
        public int MemberCount { get; set; }
        public Guid AdminUserId { get; set; }
        public string AdminName { get; set; }
        public IEnumerable<UserDto> FamilyMembers { get; set; }
        public IEnumerable<ThreadDtoOverview> Threads { get; set; }

    }
}
