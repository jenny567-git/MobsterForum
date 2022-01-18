using System;

namespace mobster_backend.Models
{
    public class Post
    {
        public Guid Id { get; set; }
        public Guid ThreadId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public virtual User Author { get; set; }
        public virtual Thread Thread { get; set; }
    }
}
