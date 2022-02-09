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
        public string CreatedAt { get; set; }
        public bool IsCensored { get; set; }
        public IEnumerable<PostDto> Posts { get; set; }
    }
}
