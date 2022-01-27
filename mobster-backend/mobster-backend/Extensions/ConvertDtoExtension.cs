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
                Family = thread.Family,
                Author = thread.Author,
                Title = thread.Title,
                Content = thread.Content,
                CreatedAt = thread.CreatedAt,
                Posts = thread.Posts,
            };
        }

        public static IEnumerable<ThreadDto> ToThreadDtos(this IEnumerable<Thread> threads)
        {
            if (threads == null)
            {
                return null;
            }

            return threads.Select(f => f.ToThreadDto());
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
                AdminUserId = family.Admin.UserId
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
                AuthId = user.AuthId,
                UserName = user.UserName
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
    }
}
