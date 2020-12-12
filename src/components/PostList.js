import React from 'react';

import Post from './Post'
const PostList = ({posts}) => {
    return (
        <div className="mews">
          {posts.slice(0).reverse().map(post => (
            <Post post={post}/>
          ))}
        </div>
    
    );
};

export default PostList;