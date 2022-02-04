using mobster_backend.DTOs.Read;
using mobster_backend.Models;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace mobster_backend.Extensions
{
    /// <summary>
    /// Class used to convert entity to DTO and DTO to entity
    /// </summary>
    public static class ConvertDtoExtension
    {
        public static ThreadDto ToThreadDto(this Thread thread)
        {
            if (thread == null)
            {
                return null;
            }

            return new ThreadDto
            {
                ThreadId = thread.ThreadId,
                Family = thread.Family.ToFamilyDto(),
                Author = thread.Author?.ToUserDto(),
                Title = thread.Title,
                Content = thread.Content,
                CreatedAt = thread.CreatedAt,
                Posts = thread.Posts?.ToPostDtos()
            };
        }

        public static IEnumerable<ThreadDto> ToThreadDtos(this IEnumerable<Thread> threads)
        {
            if (!threads.Any())
            {
                return null;
            }

            return threads.Select(f => f.ToThreadDto());
        }
        
        public static ThreadDtoOverview ToThreadDtoOverview(this Thread thread)
        {
            if (thread == null)
            {
                return null;
            }

            return new ThreadDtoOverview
            {
                ThreadId = thread.ThreadId,
                FamilyName = thread.Family.Name,
                FamilyId = thread.FamilyId,
                Author = thread.Author.ToUserDto(),
                Title = thread.Title,
                CreatedAt = thread.CreatedAt,
                Content = thread.Content,
            };
        }

        public static IEnumerable<ThreadDtoOverview> ToThreadDtosOverview(this IEnumerable<Thread> threads)
        {
            if (!threads.Any())
            {
                return null;
            }

            return threads.Select(f => f.ToThreadDtoOverview());
        }

        public static PostDto ToPostDto(this Post post)
        {
            if (post == null)
            {
                return null;
            }

            return new PostDto
            {
                PostId = post.PostId,
                ThreadId = post.ThreadId,
                Content = post.Content,
                IsCensored = post.IsCensored,
                CreatedAt = post.CreatedAt,
                Author = post.Author.ToUserDto(),
            };
        }

        public static IEnumerable<PostDto> ToPostDtos(this IEnumerable<Post> posts)
        {
            if(!posts.Any())
            {
                return null;
            }

            return posts.Select(p => p.ToPostDto());
        }

        public static FamilyDto ToFamilyDto(this Family family)
        {
            if (family == null)
            {
                return null;
            }

            return new FamilyDto
            {
                FamilyId = family.FamilyId,
                Name = family.Name,
                Description = family.Description,
                AddedAt = family.AddedAt,
                UpdatedAt = family.UpdatedAt,
                MemberCount = family.MemberCount,
                AdminUserId = family.Admin.UserId,
                FamilyMembers = family.FamilyMembers?.ToUserDtos(),
                Threads = family.Threads?.ToThreadDtosOverview()
            };
        }

        public static IEnumerable<FamilyDto> ToFamilyDtos(this IEnumerable<Family> families)
        {
            if (families == null)
            {
                return null;
            }

            return families.Select(f => f.ToFamilyDto());
        }
        
        public static UserDto ToUserDto(this User user)
        {
            if (user == null)
            {
                return null;
            }

            return new UserDto
            {
                UserId = user.UserId,
                UserName = user.UserName,
                IsBanned = user.IsBanned,
                AuthId = user.AuthId
            };
        }

        public static IEnumerable<UserDto> ToUserDtos(this IEnumerable<User> users)
        {
            if (users == null)
            {
                return null;
            }

            return users.Select(f => f.ToUserDto());
        }
        public static UserDto ToUserDto(this BlockedMember user)
        {
            if (user == null)
            {
                return null;
            }

            return new UserDto
            {
                UserId = user.UserId,
                CreatedAt = user.BlockedAt
            };
        }

        public static IEnumerable<UserDto> ToUserDtos(this IEnumerable<BlockedMember> users)
        {
            if (users == null)
            {
                return null;
            }

            return users.Select(f => f.ToUserDto());
        }
    }
}
