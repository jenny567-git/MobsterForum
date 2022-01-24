using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobster_backend.Interfaces
{
    public interface IPostService
    {
        Task AddPost(SetPostDto model);
        Task<IEnumerable<PostDto>> GetPostsByThreadId(Guid threadId);
        Task<IEnumerable<PostDto>> GetPostsByAuthorId(Guid authorId);
        Task<PostDto> GetPostById(Guid postId);
        Task UpdatePost(Guid postId, SetPostDto model);
        Task DeletePost(Guid postId);
    }
}
