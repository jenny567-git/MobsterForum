using System;

namespace mobster_backend.DTOs.Read
{
    public class UserDto
    {
        public Guid UserId { get; set; }
        public string AuthId { get; set; }
        public string UserName { get; set; }
        public string CreatedAt { get; set; }
        public bool IsBanned { get; set; }
        public bool IsActive { get; set; }


    }
}
