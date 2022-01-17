using System;

namespace mobster_backend.Models
{
    public class Thread
    {
        public Guid Id { get; set; }
        public Family Family { get; set; }
        public Guid FamilyId { get; set; }
        public User Author { get; set; }
        public Guid AuthorId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
