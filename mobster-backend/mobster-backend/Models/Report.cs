using mobster_backend.DTOs.Write;
using System;

namespace mobster_backend.Models
{
    public class Report
    {
        public Guid ReportId { get; set; }
        public Guid? SubjectUserId { get; set; }
        public Guid ObjectUserId { get; set; }
        public string Reason { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid? ThreadId { get; set; }
        public Guid? PostId { get; set; }

        public virtual User? SubjectUser { get; set; }
        public virtual User ObjectUser { get; set; }
        public virtual Thread Thread { get; set; }
        public virtual Post Post { get; set; }

        public Report() {}

        public Report(SetReportDto model)
        {
            SubjectUserId = model.SubjectUserId;
            ObjectUserId = model.ObjectUserId;
            Reason = model.Reason;
            CreatedAt = DateTime.Now;
            ThreadId = model.ThreadId;
            PostId = model.PostId;
        }
    }
}
