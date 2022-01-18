using System;
using System.Collections.Generic;

namespace mobster_backend.Models
{
    public class Family
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime AddedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public int MemberCount { get; set; } = 1;
        
        //navigation property only
        public Admin Admin { get; set; }
        public virtual ICollection<User> FamilyMembers { get; set; } = new HashSet<User>();
        public virtual ICollection<Thread> Threads { get; set; } = new HashSet<Thread>();

        public Family(string name, string description)
        {
            this.Name = name;
            this.Description = description;
        }
    }
}
