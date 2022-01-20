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
    }
}
