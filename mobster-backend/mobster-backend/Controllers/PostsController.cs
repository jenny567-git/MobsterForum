using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mobster_backend.DTOs.Write;
using mobster_backend.Exceptions;
using mobster_backend.Interfaces;
using System;
using System.Threading.Tasks;

namespace mobster_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostService postService;

        public PostsController(IPostService postService)
        {
            this.postService = postService;
        }

        /// <summary>
        /// Gets a single post by post id
        /// </summary>
        /// <param name="postId">The id of the requested post</param>
        /// <returns></returns>
        [HttpGet("{postId}")]
        public async Task<IActionResult> GetPostById(Guid postId)
        {
            try
            {
                var post = await postService.GetPostById(postId);
                return Ok(post);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
        /// <summary>
        /// Gets all posts belonging to the thread with given id
        /// </summary>
        /// <param name="threadId">The id of the thread the posts belong to</param>
        /// <returns></returns>
        [HttpGet("/thread/{threadId}")]
        public async Task<IActionResult> GetPostsByThreadId(Guid threadId)
        {
            try
            {
                var posts = await postService.GetPostsByThreadId(threadId);
                return Ok(posts);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Gets all posts written by a specific user
        /// </summary>
        /// <param name="authorId">The id of the author of the requested posts</param>
        /// <returns></returns>
        [HttpGet("/author/{authorId}")]
        public async Task<IActionResult> GetPostsByAuthorId(Guid authorId)
        {
            try
            {
                var posts = await postService.GetPostsByAuthorId(authorId);
                return Ok(posts);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Creates a new post belonging to an existing thread.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        
        public async Task<IActionResult> AddPost(SetPostDto model)
        {
            try
            {
                await postService.AddPost(model);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        /// <summary>
        /// Updates an existing post
        /// </summary>
        /// <param name="postId">The id of the post to be updated</param>
        /// <param name="model">The model for the post object to be updated</param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdatePost(Guid postId, SetPostDto model)
        {
            try
            {
                await postService.UpdatePost(postId, model);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        [HttpPut("/censor/{postId}")]
        public async Task<IActionResult> ToggleCensorPost(Guid postId)
        {
            try
            {
                await postService.ToggleCensorPost(postId);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        /// <summary>
        /// Deletes an existing post
        /// </summary>
        /// <param name="postId">The id of the post to be deleted</param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeletePost(Guid postId)
        {
            try
            {
                await postService.DeletePost(postId);
            }
            catch (DbNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
    }
}
