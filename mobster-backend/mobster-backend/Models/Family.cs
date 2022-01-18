using System;
using System.Collections.Generic;

namespace mobster_backend.Models
{
    public class Family
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime AddedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int MemberCount { get; set; }
        public Admin Admin { get; set; }

        public virtual ICollection<User> FamilyMembers { get; set; }
        public virtual ICollection<Thread> Threads{ get; set; }

        public Family()
        {
            FamilyMembers = new HashSet<User>();
            Threads = new HashSet<Thread>();
        }
    }
}
