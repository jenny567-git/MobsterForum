using mobster_backend.Models;
using System;

namespace mobster_backend.DTOs.Read
{
    public class PostDto
    {
        public Guid PostId { get; set; }
        public Guid? ThreadId { get; set; }
        public string Content { get; set; }
        public bool IsCensored { get; set; }
        public string CreatedAt { get; set; }
        public UserDto Author { get; set; }
    }
}
