using System;

namespace mobster_backend.Models
{
    public class Family
    {
        public Guid Id { get; set; }
        public User Admin { get; set; }
        public Guid AdminId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime AddedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int MemberCount { get; set; }

    }
}
