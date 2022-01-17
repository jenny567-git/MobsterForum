using System;

namespace mobster_backend.Models
{
    public class Post
    {
        public Guid Id { get; set; }
        public Thread Thread { get; set; }
        public Guid ThreadId { get; set; }
        public User Author { get; set; }
        public Guid AuthorId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
