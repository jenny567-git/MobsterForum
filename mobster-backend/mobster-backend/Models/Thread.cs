using System;
using System.Collections.Generic;

namespace mobster_backend.Models
{
    public class Thread
    {

        public Guid ThreadId { get; set; }
        public Guid FamilyId { get; set; }
        public Guid AuthorId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public virtual Family Family { get; set; }
        public virtual User Author { get; set; }
        public ICollection<Post> Posts { get; set; }

        public Thread(string title, string content, Guid familyId, Guid authorId)
        {
            this.Title = title;
            this.Content = content;
            this.FamilyId = familyId;
            this.AuthorId = authorId;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            Posts = new HashSet<Post>();
        }
    }
}
