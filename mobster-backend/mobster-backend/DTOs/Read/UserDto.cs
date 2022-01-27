using System;

namespace mobster_backend.DTOs.Read
{
    public class UserDto
    {
        public Guid UserId { get; set; } //auth0Id
        public string UserName { get; set; }

        public bool IsBanned { get; set; }

    }
}
