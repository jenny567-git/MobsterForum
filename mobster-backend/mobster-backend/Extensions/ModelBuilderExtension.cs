using Microsoft.EntityFrameworkCore;
using mobster_backend.Models;

namespace mobster_backend.Extensions
{
    public static class ModelBuilderExtension
    {
        public static ModelBuilder AddRestrictions(this ModelBuilder builder)
        {
            #region User
            
            builder.Entity<User>(e =>
                e.Property(p => p.UserName)
                    .IsRequired()
                    .HasMaxLength(50)
            );

            builder.Entity<User>().HasIndex(e => e.UserName).IsUnique();
            #endregion

            #region BlockedMember
            
            builder.Entity<BlockedMember>(e =>
                e.Property(p => p.Description).HasMaxLength(200)
                );
            #endregion

            #region Family

            builder.Entity<Family>(e =>
                e.Property(p => p.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                );

            builder.Entity<Family>().HasIndex(e => e.Name).IsUnique();

            builder.Entity<Family>(e =>
                e.Property(p => p.Description)
                    .HasMaxLength(1000)
                );
            #endregion

            #region Post

            builder.Entity<Post>(e =>
                e.Property(e => e.Content)
                    .HasMaxLength(15000)
                    .IsRequired()
                );
            #endregion

            #region Thread

            builder.Entity<Thread>(e =>
                e.Property(p => p.Title)
                    .HasMaxLength(500)
            );
            
            builder.Entity<Thread>(e =>
                e.Property(p => p.Content)
                    .HasMaxLength(15000)
                    .IsRequired()
            );
            #endregion

            return builder;
        }
    }
}
