using System;
using System.Collections.Generic;

namespace mobster_backend.Models
{
    public class Family
    {
        public Guid FamilyId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime AddedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int MemberCount { get; set; }
        
        //navigation property only
        public Admin Admin { get; set; }
        public virtual ICollection<User> FamilyMembers { get; set; } 
        public virtual ICollection<Thread> Threads { get; set; }

        public Family(string name, string description)
        {
            this.Name = name;
            this.Description = description;
            AddedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            MemberCount = 1;
            Threads = new HashSet<Thread>();
            FamilyMembers = new HashSet<User>();
        }

        public Family()
        {
        }
    }
}
