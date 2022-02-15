using System;

namespace mobster_backend.DTOs.Write
{
    public class SetReportDto
    {
        public Guid? SubjectUserId { get; set; }
        public Guid ObjectUserId { get; set; }
        public string Reason { get; set; }
        public Guid ThreadId { get; set; }
        public Guid? PostId { get; set; }
    }
}
