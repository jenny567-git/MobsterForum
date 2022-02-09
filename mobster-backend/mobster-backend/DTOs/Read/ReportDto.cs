using System;

namespace mobster_backend.DTOs.Read
{
    public class ReportDto
    {
        public Guid ReportId { get; set; }
        public Guid? SubjectUserId { get; set; }
        public Guid ObjectUserId { get; set; }
        public string Reason { get; set; }
        public string CreatedAt { get; set; }
        public Guid? ThreadId { get; set; }
        public Guid? PostId { get; set; }
        public string Content { get; set; }
        public string ThreadTitle { get; set; }

        public UserDto SubjectUser { get; set; }
        public UserDto ObjectUser { get; set; }
    }
}
