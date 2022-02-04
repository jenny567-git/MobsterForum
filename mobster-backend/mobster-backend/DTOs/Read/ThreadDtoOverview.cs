using System;

namespace mobster_backend.DTOs.Read
{
    public class ThreadDtoOverview
    {
        public Guid ThreadId { get; set; }
        public string FamilyName { get; set; }
        public Guid FamilyId { get; set; }
        public UserDto Author { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Content { get; set; }
    }
}
