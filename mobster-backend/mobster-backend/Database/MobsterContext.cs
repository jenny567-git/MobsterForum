using Microsoft.EntityFrameworkCore;
using mobster_backend.Extensions;
using mobster_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.Database
{
    public class MobsterContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Thread> Threads { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Family> Families { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<BlockedMember> BlockedMembers { get; set; }


        public MobsterContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasDefaultSchema("forum");

            builder.Entity<User>()
                .HasMany(p => p.Families)
                .WithMany(p => p.FamilyMembers);

            builder.AddRestrictions();

            base.OnModelCreating(builder);
        }

    }

}
