using System;

namespace mobster_backend.DTOs.Write
{
    public class SetPostDto
    {
        public Guid AuthorId { get; set; }
        public Guid ThreadId { get; set; }
        public string Content { get; set; }
    }
}
