using mobster_backend.Models;
using System;
using System.Collections.Generic;

namespace mobster_backend.DTOs.Read
{
    public class ThreadDto
    {
        // change the Family, Author and Post to the DTO versions
        public Guid ThreadId { get; set; }
        public Family Family { get; set; }
        public User Author { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}
