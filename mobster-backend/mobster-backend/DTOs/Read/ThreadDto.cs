using mobster_backend.Models;
using System;
using System.Collections.Generic;

namespace mobster_backend.DTOs.Read
{
    public class ThreadDto
    {
        public Guid ThreadId { get; set; }
        public FamilyDto Family { get; set; }
        public UserDto Author { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<PostDto> Posts { get; set; }
    }
}
