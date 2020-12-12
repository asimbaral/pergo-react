import React from 'react';

const Post = ({post}) => {
    return (
        <div className="post">
          <button>Like</button>
          <span>{post.like}</span>
          <h3>{post.like}</h3>
          <h4>{post.type}</h4>
          <p>{post.content}</p>
          <small>{(new Date(post.created)).toString()}</small>
          <form>
              <textarea type="text" id="content" name="content" maxlength="200"></textarea>
              <button>Comment</button>
          </form>
        </div>
    
    );
}

export default Post;