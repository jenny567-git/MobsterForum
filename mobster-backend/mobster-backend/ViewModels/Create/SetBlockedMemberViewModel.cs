using System;

namespace mobster_backend.ViewModels.Create
{
    public class SetBlockedMemberViewModel
    {
        public Guid FamilyId { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; }

    }
}
