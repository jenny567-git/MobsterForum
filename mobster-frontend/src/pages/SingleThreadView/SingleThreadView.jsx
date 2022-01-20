import React from 'react';
import "./SingleThreadView-styling.css"

function SingleThreadView() {
  return <div className="SingleThreadView">
    <div className="thread-container">
      <div className="thread">
        <p className="thread-metadata">posted by UserName in FamilyName at Created at</p>
        <h2>Title</h2>
        <p>thread text</p>
        <div className="thread-btns">
          <button>reply</button>
          <button>report</button>
        </div>
      </div>
      <div className="thread-posts">

      </div>
      <div className="thread-reply">
        <textarea id="reply-textarea" cols="60" rows="5"></textarea>
        <button>post reply</button>
      </div>
  </div>
</div>;
}

export default SingleThreadView;
