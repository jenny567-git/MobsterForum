using mobster_backend.Models;
using System;

namespace mobster_backend.DTOs.Read
{
    public class PostDto
    {
        public Guid PostId { get; set; }
        public Guid ThreadId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserDto Author { get; set; }
        public ThreadDto Thread { get; set; }
    }
}
