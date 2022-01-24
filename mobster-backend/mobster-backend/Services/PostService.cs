using Microsoft.EntityFrameworkCore;
using mobster_backend.Database;
using mobster_backend.DTOs.Read;
using mobster_backend.DTOs.Write;
using mobster_backend.Exceptions;
using mobster_backend.Extensions;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mobster_backend.Services
{
    public class PostService : IPostService
    {
        private readonly MobsterContext context;
        public PostService(MobsterContext context)
        {
            this.context = context;
        }
        public async Task AddPost(SetPostDto model)
        {
            var post = new Post(model.ThreadId, model.AuthorId, model.Content);

            context.Posts.Add(post);
            
            await context.SaveChangesAsync();
        }

        public async Task DeletePost(Guid postId)
        {
            var post = await context.Posts
                .FirstOrDefaultAsync(p => p.PostId == postId);

            if(post == null)
            {
                throw new DbNotFoundException($"No post with id {postId} exists in the database.");
            }
            else
            {
                context.Posts.Remove(post);
                await context.SaveChangesAsync();
            }
        }

        public async Task<PostDto> GetPostById(Guid postId)
        {
            var post = await context.Posts
                .Include(p => p.Author)
                .FirstOrDefaultAsync(p => p.PostId == postId);

            if(post == null)
            {
                throw new DbNotFoundException($"No post with id {postId} exists in the database.");
            }
            else
            {
                return post.ToPostDto();
            }
        }

        public async Task<IEnumerable<PostDto>> GetPostsByAuthorId(Guid authorId)
        {
            var posts = await context.Posts
                .Include(p => p.Author)
                .Where(p => p.AuthorId == authorId)
                .ToListAsync();

            if (!posts.Any())
            {
                throw new DbNotFoundException($"The user with id {authorId} does not have any posts in the database.");
            }
            else
            {
                return posts.ToPostDtos();
            }
        }

        public async Task<IEnumerable<PostDto>> GetPostsByThreadId(Guid threadId)
        {
            var posts = await context.Posts
                .Include(p => p.Author)
                .Where(p => p.ThreadId == threadId)
                .ToListAsync();

            if (!posts.Any())
            {
                throw new DbNotFoundException($"The thread with id {threadId} does not currently contain any posts.");
            }
            else
            {
                return posts.ToPostDtos();
            }
        }

        public async Task UpdatePost(Guid postId, SetPostDto model)
        {
            var post = await context.Posts
                .FirstOrDefaultAsync(p => p.PostId == postId);

            if (post == null)
            {
                throw new DbNotFoundException($"No post with id {postId} exists in the database.");
            }
            else
            {
                post.Content = model.Content;
                post.UpdatedAt = DateTime.Now;

                await context.SaveChangesAsync();
            }
        }
    }
}
