using System;
using System.Collections.Generic;

namespace mobster_backend.Models
{
    public class Thread
    {
        //hej
        public Guid Id { get; set; }
        public Guid FamilyId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        
        public virtual Family Family { get; set; }
        public virtual User Author { get; set; }
        public ICollection<Post> Posts { get; set; }

        public Thread()
        {
            Posts = new HashSet<Post>();
        }
    }
}
