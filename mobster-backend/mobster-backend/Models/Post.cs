using System;

namespace mobster_backend.Models
{
    public class Post
    {
        public Guid PostId { get; set; }
        public Guid ThreadId { get; set; }
        public Guid AuthorUserId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsCensored { get; set; }

        public virtual User Author { get; set; }
        public virtual Thread Thread { get; set; }

        public Post(Guid threadId, Guid authorUserId, string content)
        {
            this.ThreadId = threadId;
            this.AuthorUserId = authorUserId;
            this.Content = content;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            IsCensored = false;
        }
    }

    
}
